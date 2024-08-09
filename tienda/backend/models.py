from django.db import models
import hashlib

# Create your models here.
class Usuario(models.Model):
    username = models.CharField(unique = True, max_length=15)
    password = models.CharField(max_length=255)
    nombre = models.CharField(max_length=30)
    
    
    
    
class Categoria(models.Model):
    nombre = models.CharField(max_length=50)
    
    def __str__(self):
        return self.nombre

class Producto(models.Model):
    nombre = models.CharField(max_length=50)
    descripcion = models.TextField()
    informacion = models.TextField()
    precio_unitario = models.DecimalField(max_digits=10, decimal_places=2)
    iva = models.DecimalField(max_digits=10, decimal_places=2)
    categoria = models.ForeignKey(Categoria, on_delete=models.CASCADE)
    
    def __str__(self):
        return self.nombre

class Carrito(models.Model):
    pass