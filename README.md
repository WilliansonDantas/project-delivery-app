# App de Delivery!

O App de Delivery foi um projeto em grupo realizado durante o meu curso na Trybe, onde foi desenvolvido um app de delivery para uma distribuidora de bebidas.

-----

### <img height="20" src="https://raw.githubusercontent.com/innng/innng/master/assets/soulgem-sayaka.gif"/> Contextualização:

A distribuidora de cervejas da dona Tereza está se informatizando! 🚀 

Seu negócio, antes focado em um local específico da cidade, passou a receber uma quantidade massiva de encomendas de outros pontos, expandindo sua atuação via delivery. Isso tudo graças ao excelente preço das bebidas e atendimento da equipe de vendas.

Agora a distribuidora possui alguns pontos de venda na cidade para agilizar no atendimento dessas áreas. Cada ponto de venda, por sua vez, possui uma pessoa vendedora responsável.

Como seu antigo sistema, que era um conjunto de planilhas, já não atende a necessidade do negócio por gerar muita manutenção, dona Tereza procurou a minha equipe de pessoas desenvolvedoras com uma ideia de aplicativo que pudesse agilizar a vida de sua equipe e das pessoas que compram seus produtos. 

### <img height="20" src="https://raw.githubusercontent.com/innng/innng/master/assets/soulgem-sayaka.gif"/> Funcionalidades:

- Acesso via login: tanto clientes como pessoas vendedoras, assim como a própria dona Tereza, que administra o sistema, devem ter acesso ao aplicativo via login, porém para funções diferentes.
- Fazer a comunicação entre clientes e pessoas vendedoras: a pessoa cliente faz o pedido via "carrinho de compras" e a pessoa vendedora aprova, prepara e envia esse pedido. Quando o produto é recebido por quem comprou, essa pessoa marca o pedido como "recebido". Ambos devem possuir detalhes sobre seus pedidos;
- Se a pessoa cliente faz o pedido, o mesmo deve aparecer para a pessoa vendedora em seu dash de pedidos após a atualização da página. A pessoa cliente, por sua vez, deve ter as informações sobre seu pedido quando sua página for atualizada, ou seja, ter informações se o pedido está sendo preparado ou se já saiu pra entrega;


### <img height="20" src="https://raw.githubusercontent.com/innng/innng/master/assets/soulgem-sayaka.gif"/> Instalação:

Clone o repositório

```
git@github.com:WilliansonDantas/project-delivery-app.git
```

Acesse o diretório do projeto

```
cd project-delivery-app
```

Há um gerenciador de processos (PM2) para rodar a aplicação. Rode o comando a seguir e a aplicação já estará pronta para o uso.

```
npm start
```

### <img height="20" src="https://raw.githubusercontent.com/innng/innng/master/assets/soulgem-sayaka.gif"/> Fluxo de Cliente:

- O cliente deverá fazer o login, caso não possua conta, poderá criar uma outra conta que será registrada no banco de dados.

- Assim que estiver logado, deverá escolher quais cervejas irá comprar e realizar o pedido selecionando o vendedor respectivo.

- Usuário inicialmente registrado: 

email: 

```
zebirita@email.com
```

senha: 

```
$#zebirita#$
```

### <img height="20" src="https://raw.githubusercontent.com/innng/innng/master/assets/soulgem-sayaka.gif"/> Fluxo do Vendedor:

- Assim que o pedido for efetuado, o vendedor irá receber e deve alterar os status conforme o andamento do pedido.

- Usuário inicialmente registrado: 

email: 

```
fulana@deliveryapp.com
```

senha: 

```
fulana@123
```

### <img height="20" src="https://raw.githubusercontent.com/innng/innng/master/assets/soulgem-sayaka.gif"/> Fluxo do Admin:

- O admin é o que gerencia todos os usuários no banco de dados podendo adicionar e/ou remover.

- Usuário inicialmente registrado: 

email: 

```
adm@deliveryapp.com
```

senha: 

```
--adm2@21!!--
```


<!-- 
-->
