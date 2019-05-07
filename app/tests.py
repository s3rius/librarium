from django.test import TestCase
from django.urls import resolve


class SmokeTest(TestCase):
    def test_home_page(self):
        found = resolve('/')
        self.assertEqual(found.view_name, "index")
