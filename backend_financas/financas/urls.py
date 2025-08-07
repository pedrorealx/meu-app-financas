from django.urls import path
from . import views

app_name = 'financas'

urlpatterns = [
    path('', views.dashboard, name='dashboard'),
    path('api/dados/', views.dados_financeiros, name='dados_financeiros'),
]
