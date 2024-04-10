import unittest
from app import app

class FlaskAppTests(unittest.TestCase):

    def setUp(self):
        app.config['TESTING'] = True
        app.config['WTF_CSRF_ENABLED'] = False
        self.app = app.test_client()

    def tearDown(self):
        pass

    def test_homepage_redirect(self):
        response = self.app.get('/')
        self.assertEqual(response.status_code, 302)
        self.assertTrue(response.headers['Location'].endswith('/HomeDash'))

    def test_render_dash_route_get(self):
        response = self.app.get('/HomeDash')
        self.assertEqual(response.status_code, 200)

    def test_render_dash_route_post_logging_enabled(self):
        response = self.app.post('/HomeDash', data={'logButton': True})
        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertIn('message', data)
        self.assertEqual(data['message'], 'Logging is now enabled')

    def test_update_logging_route_logging_enabled(self):
        data = {'isLoggingEnabled': True}
        response = self.app.post('/update-logging', json=data)
        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertIn('message', data)
        self.assertEqual(data['message'], 'Logging is now enabled')

if __name__ == '__main__':
    unittest.main()
