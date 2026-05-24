#!/bin/sh
# Este script é executado quando o container inicia.
# Ele pode ser usado para injetar variáveis de ambiente no frontend em tempo de execução (runtime).
# Como o Vite faz o build estático, se precisar de variáveis dinâmicas,
# você pode substituir valores em um config.js na pasta /usr/share/nginx/html.

echo "Inicializando Nginx e configurando container..."
exit 0
