from django.shortcuts import render
from .models import Usuario, Producto, Categoria
from rest_framework import viewsets
from .serializer import ProductoSerializer, CategoriaSerializer, UsuarioSerializer
from rest_framework.response import Response
from rest_framework.decorators import action
import hashlib
# Create your views here.

class ProductoViewSet(viewsets.ModelViewSet):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer
    
class CategoriaViewSet(viewsets.ModelViewSet):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer
    
    @action(detail=True, methods=['get'])
    def getproduct(self, request, pk=None):
        print(request)
        #categoria = Categoria.objects.get(id = 1)
        productos = Producto.objects.filter(categoria = pk).values()
        return Response(productos)
    
class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer
    
    @action(detail=False, methods=['post'])
    def login(self, request, pk=None):
        username = request.POST['username']
        password = hashlib.sha256(request.POST['password'].encode()).hexdigest()
        try:
            usuario = Usuario.objects.get(username=username)
            if usuario.password == password:
                return Response({'valido':True})
            else:
                return Response({'valido':False})
        except Usuario.DoesNotExist:
            return Response({'error':'Usuario no existe'})
        
    
