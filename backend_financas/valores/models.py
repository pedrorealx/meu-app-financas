from django.db import models

class ValorFixo(models.Model):
    valor = models.DecimalField(max_digits=10, decimal_places=2)
    criado_em = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Fixo: R$ {self.valor}"


class ValorAvulso(models.Model):
    valor = models.DecimalField(max_digits=10, decimal_places=2)
    criado_em = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Avulso: R$ {self.valor}"
