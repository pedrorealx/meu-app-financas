from django.db import models

class Login(models.Model):
    email = models.EmailField(unique=True)
    senha = models.CharField(max_length=100)

    def __str__(self):
        return self.email


class Valor(models.Model):
    MES_CHOICES = [
        ('Janeiro','Janeiro'), ('Fevereiro','Fevereiro'), ('Março','Março'),
        ('Abril','Abril'), ('Maio','Maio'), ('Junho','Junho'),
        ('Julho','Julho'), ('Agosto','Agosto'), ('Setembro','Setembro'),
        ('Outubro','Outubro'), ('Novembro','Novembro'), ('Dezembro','Dezembro')
    ]

    TIPO_CHOICES = [
        ('fixo', 'Fixo'),
        ('avulso', 'Avulso')
    ]

    mes = models.CharField(max_length=20, choices=MES_CHOICES)
    tipo = models.CharField(max_length=10, choices=TIPO_CHOICES)
    valor = models.FloatField()
    motivo = models.CharField(max_length=200)
