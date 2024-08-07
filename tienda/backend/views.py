from django.shortcuts import render
from .models import Usuario, Producto, Categoria
from rest_framework import viewsets
from .serializer import ProductoSerializer, CategoriaSerializer, UsuarioSerializer
# Create your views here.

def login(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        usuario = Usuario.objects.get(username=username)
        if usuario.password == password:
            return render(request, 'home.html')
    return render(request, 'login.html')

class ProductoViewSet(viewsets.ModelViewSet):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer
    
class CategoriaViewSet(viewsets.ModelViewSet):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer
    
class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer