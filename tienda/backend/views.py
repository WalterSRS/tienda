from django.shortcuts import render
from .models import Usuario, Producto, Categoria
from rest_framework import viewsets
from .serializer import ProductoSerializer, CategoriaSerializer, UsuarioSerializer
from rest_framework.response import Response
from rest_framework.decorators import action
import hashlib
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
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

    @action(detail=False, methods=['post'], url_path='login')
    def login(self, request):
        username = request.data.get('username')
        password = hashlib.sha256(request.data.get('password').encode()).hexdigest()
        try:
            usuario = Usuario.objects.get(username=username)
            if usuario.password == password:
                return Response({'valido': "True", 'mensaje': 'Usuario coincide', 'result': {'token': 'dummy_token'}})
            else:
                return Response({'valido': "False", 'mensaje': 'Contraseña incorrecta'})
        except Usuario.DoesNotExist:
            return Response({'valido': "False", 'mensaje': 'Usuario no existe'})
        
        
