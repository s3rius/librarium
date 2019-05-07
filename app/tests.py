from django.test import TestCase
from django.urls import resolve


class SmokeTest(TestCase):
    def test_home_page(self):
        found = resolve('/')
        #  print("-" * 100)
        #  print(found.func)
        #  print("-" * 100)
        self.assertEqual(found.view_name, "index")
