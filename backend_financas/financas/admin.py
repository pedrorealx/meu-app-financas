from django.contrib import admin
from .models import Receita, Despesa, Categoria

admin.site.register(Receita)
admin.site.register(Despesa)
admin.site.register(Categoria)