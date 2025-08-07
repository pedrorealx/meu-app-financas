from django.shortcuts import render
from django.http import JsonResponse
from django.db.models import Sum
from .models import Receita, Despesa

def dashboard(request):
    return render(request, 'financas/dashboard.html')

def dados_financeiros(request):
    # Agregar receitas e despesas por mês
    receitas_por_mes = Receita.objects.values('data__year', 'data__month') \
        .annotate(total=Sum('valor')).order_by('data__year', 'data__month')

    despesas_por_mes = Despesa.objects.values('data__year', 'data__month') \
        .annotate(total=Sum('valor')).order_by('data__year', 'data__month')

    # Organizar dados para enviar ao frontend
    data = {
        'receitas': list(receitas_por_mes),
        'despesas': list(despesas_por_mes),
    }
    return JsonResponse(data)
