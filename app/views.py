from django.shortcuts import render
from django.views.generic import TemplateView
from django.http import HttpResponse


# Create your views here.
class IndexView(TemplateView):
    template_name = "index.html"

#  def index_page(request):
#  print("testetIdjALWcdAWIudcNALWUIdcnAIWLUCCNALW")
#  page = TemplateView.as_view(template_name="index.html")
#  print(dir(page))
