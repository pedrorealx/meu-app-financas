from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Login, Valor


@api_view(['POST'])
def login_api(request):
    email = request.data.get('email')
    senha = request.data.get('senha')

    existe = Login.objects.filter(email=email, senha=senha).exists()
    return Response({"ok": existe})


@api_view(['POST'])
def salvar(request):
    Valor.objects.create(
        mes=request.data['mes'],
        tipo=request.data['tipo'],
        valor=request.data['valor'],
        motivo=request.data['motivo']
    )
    return Response({"ok": True})


@api_view(['GET'])
def listar(request):
    fixos = [0]*12
    avulsos = [0]*12
    meses = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho',
             'Julho','Agosto','Setembro','Outubro','Novembro','Dezembro']
    motivosFixos = ['']*12
    motivosAvulsos = ['']*12

    for v in Valor.objects.all():
        i = meses.index(v.mes)
        if v.tipo == 'fixo':
            fixos[i] = v.valor
            motivosFixos[i] = v.motivo
        else:
            avulsos[i] = v.valor
            motivosAvulsos[i] = v.motivo

    return Response({
        "fixos": fixos,
        "avulsos": avulsos,
        "motivosFixos": motivosFixos,
        "motivosAvulsos": motivosAvulsos
    })
