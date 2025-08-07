from django.contrib import admin
from .models import Categoria, Receita, Despesa

admin.site.register(Categoria)
admin.site.register(Receita)
admin.site.register(Despesa)
