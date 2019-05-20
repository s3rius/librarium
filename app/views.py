from django.core.handlers.wsgi import WSGIRequest
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.generic.base import View
from jwt_auth.mixins import JSONWebTokenAuthMixin
from rest_framework.parsers import JSONParser
from rest_framework_jwt.authentication import JSONWebTokenAuthentication

from app.models import Bundles, Resources
from app.serializers import BundlesSerializer, ResourcesSerializer


def auth_required(f):
    def a(*args, **kwargs):
        request: WSGIRequest = args[0]
        if request.headers.get('token'):
            print("token")
            print(f"a : {request.user}")
            return f(*args, **kwargs)
        else:
            return HttpResponse('{"error": "login required"}', status=403)

    return a


@csrf_exempt
def entries_list(request):
    if request.method == 'GET':
        entries = Bundles.objects.all()
        serializer = BundlesSerializer(entries, many=True)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = BundlesSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)


# @login_required
# @csrf_exempt
# def print_auth(request):
#     return HttpResponse('lol')
#
#
# def test_auth(request):
#     if request.user.is_authenticated:
#         return HttpResponse("We authed")
#     else:
#         return HttpResponse('fuck you, anon')
class PostsView(JSONWebTokenAuthMixin, View):
    authentication_class = (JSONWebTokenAuthentication,)

    def get(self, request):
        return HttpResponse("We authed")


class PreviewView(JSONWebTokenAuthMixin, View):

    def get(self, request, resource_id):
        resource = Resources.objects.get(id=resource_id)
        preview = resource.get_content_preview()
        if preview is not None:
            response = HttpResponse(content_type='image/jpeg')
            preview.save(response, "JPEG")
            return response
        else:
            return HttpResponse('Preview not available', status=204)


class AllResourcesView(JSONWebTokenAuthMixin, View):
    def get(self, request):
        count = int(request.GET.get("count", 50))
        offset = int(request.GET.get("offset", 0))
        entries = Resources.objects.all().order_by("-likes")[offset:(offset + count):1]
        serializer = ResourcesSerializer(entries, many=True)
        return JsonResponse(serializer.data, safe=False)


class ResourceView(JSONWebTokenAuthMixin, View):
    def get(self, request, resource_id):
        entry = Resources.objects.get(id=resource_id)
        serializer = ResourcesSerializer(entry)
        return JsonResponse(serializer.data, safe=False)


class ContentView(JSONWebTokenAuthMixin, View):
    def get(self, request, resource_id):
        entry = Resources.objects.get(id=resource_id)
        file_bytes = entry.content
        return HttpResponse(file_bytes, content_type=entry.get_content_mime())


class TestToken(JSONWebTokenAuthMixin, View):
    def get(self, request):
        return HttpResponse('{ "response": "We\'re ok." }')
