from django.urls import path, include
from rest_framework import routers
from backend import views

router = routers.DefaultRouter()
router.register(r'productos',views.ProductoViewSet)
router.register(r'categorias',views.CategoriaViewSet)
router.register(r'usuarios',views.UsuarioViewSet)

urlpatterns = [
    path('', include(router.urls))
]
