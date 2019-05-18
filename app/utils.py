import json
import random
from random import randint

import bs4
import requests


def get_random_quote(title: str):
    wiki_url = "http://en.wikiquote.org/w/api.php"
    # page=Discworld&action=parse&prop=sections&format=json
    response = requests.get(wiki_url, params={
        "page": title,
        "action": "parse",
        "prop": "sections",
        "format": "json"
    })
    sections = json.loads(response.content)
    rand_section = randint(1, len(sections.get("parse").get("sections")))
    print(rand_section)
    response = requests.get(wiki_url, params={
        "page": title,
        "action": "parse",
        "section": rand_section,
        "prop": "text",
        "format": "json"
    })
    quotes_resonse = json.loads(response.content)
    text = quotes_resonse.get("parse").get("text").get("*")
    soup = bs4.BeautifulSoup(text, features="html.parser")
    quotes = soup.select("ul > li")
    quote = random.choice(quotes)
    quote_text = quote.text
    quote_author = quote.find("li")
    rand_quote = {
        "quote": quote_text,
        "author": quote_author.text if quote_author is not None else ""
    }
    from pprint import pprint
    pprint(rand_quote)
    return text
