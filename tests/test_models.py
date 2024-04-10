import unittest
from app import create_app, db, connect_db, User

class TestModels(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        cls.app = create_app('testing')
        cls.client = cls.app.test_client()
        with cls.app.app_context():
            connect_db(cls.app)
    
    @classmethod
    def tearDownClass(cls):
        with cls.app.app_context():
            db.session.remove()
            db.drop_all()

    def setUp(self):
        # Create some sample data for testing
        with self.app.app_context():
            user = User.register('test_user', 'password', 'test@example.com', 'Test', 'User')
            db.session.add(user)
            db.session.commit()

    def tearDown(self):
        with self.app.app_context():
            db.session.rollback()

    def test_register_method(self):
        with self.app.app_context():
            # Test registration
            user = User.register('new_user', 'password', 'new@example.com', 'New', 'User')
            db.session.add(user)
            db.session.commit()
            self.assertIsInstance(user, User)
            self.assertEqual(user.username, 'new_user')

    def test_authenticate_method(self):
        with self.app.app_context():
            # Test authentication with correct credentials
            authenticated_user = User.authenticate('test_user', 'password')
            self.assertIsInstance(authenticated_user, User)
            self.assertEqual(authenticated_user.username, 'test_user')

            # Test authentication with incorrect credentials
            wrong_password_user = User.authenticate('test_user', 'wrong_password')
            self.assertFalse(wrong_password_user)

if __name__ == '__main__':
    unittest.main()
