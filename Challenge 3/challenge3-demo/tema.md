2. Sistema de Deteção de Intrusões em Sistemas Autónomos
Descrição da Proposta:

Este projeto consiste no desenvolvimento de um sistema de deteção de intrusões (IDS) para sistemas autónomos, capaz de identificar atividades maliciosas ao nível de rede, software e comportamento do sistema.
O sistema deverá monitorizar tráfego de rede, logs de sistema e comportamento operacional, utilizando técnicas de machine learning para identificar padrões suspeitos. Deve ser capaz de detetar ataques conhecidos e desconhecidos (zero-day).
Este projeto envolve análise de dados heterogéneos, deteção de anomalias e integração com sistemas de segurança.
Visão por Computador (RNAAPIA):

Embora não central, a visão pode ser utilizada para validar comportamentos físicos associados a intrusões, como ações inesperadas de robots.
Modelos de vídeo podem ser utilizados para correlacionar eventos digitais com comportamento físico.
Língua Natural / LLMs (LNIAGIA):

LLMs podem ser utilizados para análise de logs e geração de relatórios de segurança. Técnicas de NLP permitem extrair padrões de logs e identificar eventos relevantes.
A utilização de RAG permite integrar conhecimento de bases de dados de vulnerabilidades (ex: CVE). O sistema pode responder a queries como “este comportamento é consistente com algum ataque conhecido?”.
Robótica / IoT (RAINTIA):

Os robots podem ser usados como nós IoT complexos num ecossistema com telemetria, sensores, comando e rede. O Cruzr pode funcionar como plataforma principal para recolha de tráfego e comportamento, e como alvo de testes de intrusão ao nível de comunicações (ex: comandos remotos não autorizados) e ao nível de sensores (ex: spoofing de perceção).
Os humanoides Booster/Unitree permitem validar o IDS em cenários distintos: comandos de atuação, sequências de locomoção e interação. A diversidade de plataformas é útil para garantir que o IDS não fica “overfit” a um robot específico.
O cobot permite testar intrusões em contexto de automação industrial: ataques que alteram parâmetros de controlo, ciclos de operação, pontos de passagem ou ritmo de execução, com risco físico. Pode-se instrumentar a célula com logs de comando, estado do controlador e, se existirem, medições de força.
Uma utilização prática e realista é criar “cenários de ataque” de laboratório: por exemplo, injeção de comandos, alteração de tópicos/serviços ROS, replay de mensagens, ou alterações no canal de controlo, e medir como o IDS deteta a intrusão e que impacto tem no comportamento físico.
Sistemas Multiagente (SMAGIA):

Agentes especializados monitorizam diferentes componentes (rede, sistema, aplicação). A correlação de eventos permite deteção mais precisa.
