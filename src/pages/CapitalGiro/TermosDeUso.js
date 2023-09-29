import React, {useState} from 'react';
import {Button, Text, View, ScrollView, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import Close from 'react-native-vector-icons/AntDesign';
function TermosUso({isModalVisible, method}) {
  function executeMethod() {
    method();
    console.log(isModalVisible);
  }

  return (
    <View style={{flex: 1, backgroundColor: 'red'}}>
      <Modal isVisible={isModalVisible} onBackButtonPress={executeMethod}>
        <View style={{flex: 1, backgroundColor: '#fff', padding: 5}}>
          <TouchableOpacity
            onPress={executeMethod}
            style={{
              alignSelf: 'flex-end',
            }}>
            <Close name="closecircle" color="red" size={30} />
          </TouchableOpacity>

          <ScrollView>
            <Text style={{color: '#000', fontSize: 15, fontWeight: '400'}}>
              Termos de Uso FICASH SOLUCOES FINANCEIRAS LTDA – sociedade
              empresária limitada inscrita no CNPJ/ME sob o nº
              06.069.535/0001-03, com sede na Cidade de SAO PAULO RUA FUNCHAL,
              538, SL 24, VILA OLIMPIA, SP, CEP 04.551-060 único e exclusivo
              proprietário dos domínios associados ao Site e Aplicativos
              doravante, em conjunto, denominados simplesmente “ficash”,
              estabelece as presentes condições de uso para a utilização do Site
              e Aplicativos" (“Termo de Uso”): Das Definições Os termos
              constantes neste Termo de Uso, sempre que usados com a primeira
              letra em maiúsculo, terão o significado estabelecido abaixo, seja
              no plural ou no singular: •Parceiros: significam as instituições
              indicadas na página de parceiros.onde, também constam as
              informações relacionadas a cada um dos Parceiros e os respectivos
              telefones para atendimento. As informações coletadas para cadastro
              são as indicadas na nossa Política de Privacidade. •Aplicativo:
              significa o aplicativo da ficash adaptado e desenvolvido para
              operação em telefone celular, tablet ou qualquer outro dispositivo
              móvel. •Aceitar ou Aceite: significa o ato do Usuário realizar
              ações no site seguidas do aviso de “Li e aceito os Termos de Uso e
              Política de Privacidade” disposta no Site ou no Aplicativo. Tal
              ato implica no consentimento prévio, expresso, livre e informado
              do Usuário em relação a todo o disposto em tais documentos.
              •Conteúdo: significa toda e qualquer informação disponibilizada
              pelo ou por meio do Site ou do Aplicativo, tais como textos,
              dados, software, imagens, vídeos, áudios, recursos interativos,
              etc., incluindo-se os códigos fontes empregados para exibição
              desses conteúdos, como aqueles em linguagem HTML, CSS, PHP, entre
              outros. •Conta ficash: significa a conta de acesso do Usuário à
              ficash. Esta conta é automaticamente criada e vinculada ao Usuário
              quando este fornece seus dados pessoais à ficash para receber uma
              cotação de crédito, quando também realiza o Aceite. •Dados de
              Conta: significa qualquer dado do Usuário coletado pela ficash
              diretamente nos sites de instituições financeiras e demais
              instituições autorizadas a funcionar pelo Banco Central do Brasil
              (“instituições financeiras”), que detalhe, de forma específica e
              pessoal, informações sobre a(s) sua(s) conta(s), incluindo, sem
              limitação, renda mensal do Usuário, natureza e tipo de suas
              despesas, dívidas e empréstimos, margem consignável junto ao
              empregador, histórico de desconto de empréstimos consignados,
              entre outros dados relevantes ao planejamento financeiro do
              Usuário, incluindo, ainda, dados que tenham sido inseridos pelo
              Usuário em sua Conta ficash para individualização de sua
              experiência. •Dados Financeiros Pessoais: significa qualquer dado
              do Usuário disponibilizado pelas instituições financeiras. •Dados
              Pessoais: significa qualquer dado disponibilizado pelo Usuário
              que, de alguma forma, o identifique, tais como, mas não se
              limitando a, nome, CPF, endereço, número de telefone ou endereço
              de email. •Política de Privacidade: significa a política de
              privacidade que rege as disposições sobre a utilização dos dados
              do Usuário que pode ser encontrada no seguinte link. •Site:
              significa o endereço eletrônico www. ficash.com.br ou qualquer
              outro que vier a substituí-lo. •Software: significa o software de
              propriedade exclusiva da ficash por meio do qual serão obtidos os
              Dados Financeiros Pessoais e de Gestão de Empréstimos Consignados
              do Usuário diretamente nos sites das instituições financeiras e de
              gestão de recursos humanos, bem como geridos e manejados todos os
              dados do Usuário, sempre de maneira automatizada. •Usuário:
              significa uma pessoa natural, com capacidade civil ou jurídica,
              com plena capacidade de contratar, que acessa o Site ou o
              Aplicativo e realiza o seu cadastro pessoal de modo a usufruir das
              funcionalidades oferecidas pela ficash, aderindo desta forma
              automaticamente ao presente Termo de Uso e à Política de
              Privacidade. Da Adesão Para a realização do cadastro e utilização
              das funcionalidades do Software é obrigatória a leitura,
              compreensão e Aceite do presente Termo de Uso e da Política de
              Privacidade pelo Usuário. O ACEITE DO TERMO DE USO E DA POLÍTICA
              DE PRIVACIDADE IRÁ IMPLICAR O RECONHECIMENTO, PELO USUÁRIO, DE QUE
              ELE LEU E ENTENDEU TODOS OS TERMOS CONSTANTES NESTES DOCUMENTOS.
              CASO O USUÁRIO TENHA QUALQUER DÚVIDA SOBRE O TERMO DE USO E/OU A
              POLÍTICA DE PRIVACIDADE, A FICASH RECOMENDA QUE O USUÁRIO ENTRE EM
              CONTATO COM A FICASH ANTES DE ACEITAR ESTAR SUJEITO AOS MESMOS. A
              partir do momento em que o Usuário Aceitar o Termo de Uso e a
              Política de Privacidade, as disposições neles constantes serão
              aplicáveis e irão regular plenamente a relação entre a ficash e o
              Usuário. Dessa forma, é recomendável eventual impressão de uma
              cópia dos mesmos para futura referência. Será dever do Usuário
              manter-se atento a possíveis atualizações do Termo de Uso e da
              Política de Privacidade, que podem ocorrer a qualquer tempo. Da
              Comunicação com a ficash Para qualquer assunto relacionado às
              condições deste Termo de Uso ou da Política de Privacidade, bem
              como ao Site/Aplicativo/Conteúdo/Software o Usuário deverá entrar
              em contato com a ficash por meio do e-mail contato@ficash.com.br.
              Da Utilização do Software Este Termo de Uso concede ao Usuário uma
              licença pessoal, mundial, revogável, não exclusiva e
              intransferível de uso do Software sem cobrança de royalties, sendo
              certo que o Usuário não poderá utilizar e nem permitir que
              terceiros utilizem o Software para qualquer outra finalidade não
              expressamente prevista neste Termo de Uso. Dessa forma, não será
              permitido ao Usuário, sem qualquer limitação, copiar, modificar,
              distribuir, vender ou alugar os serviços disponibilizados pela
              ficash e viabilizados pelo Software. Para poder usar os serviços
              da ficash o Usuário deverá previamente realizar o seu cadastro ou
              simulação no Site e/ou no Aplicativo, atos nos quais o Usuário
              fornecerá à ficash os seus Dados Pessoais, nome de usuário
              (“Login”) e senha que serão utilizados para acesso a Conta ficash
              do Usuário. O Usuário será responsável pela veracidade, validade e
              precisão dos Dados Pessoais ou Dados de Conta por ele fornecidos
              no seu cadastro, inclusive em relação à indicação de endereço de
              e-mail válido de sua titularidade, competindo-lhe, ainda, manter
              referido cadastro sempre atualizado. A ficash não terá qualquer
              obrigação de policiar ou fiscalizar os Dados Pessoais ou Dados de
              Conta fornecidos pelos Usuários, mas poderá, a seu exclusivo
              critério, excluir as informações que lhe pareçam inverídicas ou
              ofensivas. A senha e o Login criados pelo Usuário para acesso a
              sua Conta ficash são confidenciais e de responsabilidade exclusiva
              do Usuário, que deverá entrar em contato com a ficash,
              imediatamente, na hipótese de comprometimento do seu sigilo. A
              ficash não recomenda o uso, pelo Usuário, da mesma senha para
              diversos sites na internet/propósitos nem a inserção de Dados
              Pessoais ou Dados de Conta como parte da senha. O Usuário está
              plenamente ciente e concorda que, ao fornecer os seus Dados
              Pessoais e os seus Dados de Conta à ficash, autoriza a ficash a
              usar o Software para buscar Dados Financeiros Pessoais junto a
              cada instituição financeira e sistemas de gestão de crédito e
              recursos humanos informados pelo Usuário, sempre de maneira
              automatizada. A ficash irá então utilizar o Software para
              organizar tais dados, a fim de atender o propósito da ficash, bem
              como usar tais dados nos termos da Política de Privacidade. A
              utilização do Software pelo Usuário possui caráter pessoal e
              intransferível, unicamente para fins lícitos e relacionados ao
              propósito a que o Site e o Aplicativo se destinam, nos termos
              deste Termo de Uso. Em nenhuma hipótese, o Usuário terá acesso ao
              código fonte do Software ora licenciado, já que o código fonte do
              Software é confidencial e de titularidade exclusiva da ficash, que
              é a detentora de todos os direitos de propriedade intelectual dele
              inerentes. Dados de Conta De maneira a possibilitar a completa
              funcionalidade do Site e do Aplicativo, caso seja de interesse do
              Usuário, ele deverá informar à ficash os seus Dados de Conta e
              autorizá-la expressamente, na qualidade de mandatária, a acessar
              seus Dados Financeiros Pessoais disponibilizados no sistema de
              internet banking das instituições financeiras. Todas as senhas
              e/ou os códigos de autorização solicitados pela ficash para o
              acesso ao sistema de internet banking do Usuário serão utilizados
              apenas e tão somente nos termos da Política de Privacidade. A
              ficash não movimenta ou de qualquer forma interfere nos ativos e
              contas bancárias informados pelo Usuário. As senhas e/ou códigos
              de autorização concedidos pelo Usuário se limitam a permitir que a
              ficash apenas busque Dados Financeiros Pessoais junto a cada
              instituição financeira informada pelo Usuário, unicamente para
              fins lícitos relacionados ao propósito a que o Site e o Aplicativo
              se destinam. A ficash não se responsabilizará pela revisão ou
              confirmação dos Dados de Conta fornecidos pelo Usuário, nem pelos
              Dados Financeiros Pessoais obtidos junto aos sites das
              instituições financeiras, seja no que tange à precisão dos dados,
              seja quanto à legalidade ou ameaça de violação em função do
              fornecimento desses dados. O Usuário está ciente e concorda que a
              ficash não integra e não pode ser considerada como uma extensão
              das instituições financeiras das quais os Dados Financeiros
              Pessoais são extraídos pelo Software, não sendo a ficash em
              hipótese alguma responsável pelos produtos e/ou serviços
              oferecidos por estas, seja de maneira solidária ou subsidiária. O
              acesso aos Dados de Conta e aos Dados Financeiros Pessoais e
              Crédito do Usuário depende de serviços prestados por suas
              respectivas instituições financeiras. Sendo assim, o Usuário está
              ciente e concorda que a ficash não assume qualquer
              responsabilidade quanto à pontualidade, precisão, não entrega ou
              falha na obtenção dos Dados Financeiros Pessoais por meio dos
              sites destas instituições, já que esses dados poderão estar
              sujeitos a problemas técnicos ou outras dificuldades de conexão
              que podem resultar em falha na obtenção, perda de dados ou
              quaisquer outras interrupções de serviços. Limitações de Uso e
              Interferência O Usuário não poderá: •Utilizar o Site ou o
              Aplicativo para divulgar informações que de qualquer forma violem
              normas aplicáveis no Brasil, direitos de propriedade da ficash
              e/ou de terceiros ou os bons costumes, incluindo, sem limitação, a
              violação de direitos intelectuais, autorais e de privacidade, ou a
              produção e divulgação de conteúdo ilegal, imoral, inapropriado ou
              ofensivo; •Copiar, ceder, sublicenciar, vender, dar em locação ou
              em garantia, reproduzir, doar, alienar de qualquer forma,
              transferir total ou parcialmente, sob quaisquer modalidades,
              gratuita ou onerosamente, provisória ou permanentemente, o
              Software, assim como seus módulos, partes, manuais ou quaisquer
              informações relativas ao mesmo; •Empregar softwares, técnicas e/ou
              artifícios com o intuito de utilizar indevidamente o Site, o
              Aplicativo e/ou o Software para práticas nocivas à ficash ou a
              terceiros, tais como exploits, spamming, flooding, spoofing,
              crashing, root kits, etc.; •Reproduzir, adaptar, modificar e/ou
              empregar, no todo ou em parte, para qualquer fim, o Software ou
              qualquer Conteúdo do Site ou do Aplicativo sem a autorização
              expressa da ficash; •Publicar ou transmitir qualquer arquivo que
              contenha vírus, worms, cavalos de tróia ou qualquer outro programa
              contaminante ou destrutivo, ou que de outra forma possa interferir
              no bom funcionamento do Site, do Aplicativo ou do Software;
              •Utilizar o Software para finalidade diversa daquela para a qual
              foi disponibilizado pela ficash; •Divulgar, utilizar ou modificar
              os dados de outros Usuários; e, •Utilizar o Software, ou permitir
              seu uso, para benefício de terceiros. Informações Confidenciais e
              Política de Privacidade Ao cadastrar-se na ficash o Usuário
              concorda com a Política de Privacidade. O Aceite da Política de
              Privacidade irá autorizar a ficash a usar os dados do Usuário na
              maneira descrita no documento. Propriedade Intelectual O Usuário
              não adquire, por meio do presente Termo de Uso ou da Política de
              Privacidade, nenhum direito de propriedade intelectual ou outros
              direitos exclusivos, incluindo patentes, desenhos, bases de dados,
              marcas, direitos autorais ou direitos sobre informações
              confidenciais ou segredos de negócio, sobre ou relacionados ao
              Software, ao Aplicativo e/ou ao Site, os quais são de propriedade
              exclusiva da ficash. Caso o Usuário venha a desenvolver um novo
              módulo ou produto que caracterize cópia, de todo ou d parte do
              dicionário de dados ou do programa, o novo módulo ou produto será
              considerado como parte integrante do Software, sendo, portanto, de
              propriedade da ficash e seu uso estará condicionado a estes Termos
              de Uso. O Usuário poderá realizar o download ou imprimir uma cópia
              das informações, planilhas e gráficos disponibilizados por meio do
              Site desde que para uso pessoal e não comercializável. Qualquer
              utilização deste material e/ou do Conteúdo do Site, no todo ou em
              parte, que não para uso pessoal do Usuário, nos termos deste Termo
              de Uso, sem que haja prévio consentimento por escrito da ficash, é
              expressamente proibida. Todo e qualquer Conteúdo disponibilizado
              no Site e/ou no Aplicativo, tais como, mas não se limitando a,
              textos, gráficos, imagens, logos, ícones, fotografias, conteúdo
              editorial, notificações, softwares e qualquer outro material,
              pertencem exclusivamente à ficash e são protegidos pela lei
              brasileira no que se refere à propriedade intelectual e aos
              direitos autorais. No que se refere especialmente aos Dados de
              Conta e aos Dados Financeiros e Crédito Pessoais, o Usuário
              entende e concorda que a ficash atuará perante os sites das
              instituições financeiras, gestão de crédito ou recursos humanos,
              na qualidade de representante do Usuário. O Aceite dos Termos de
              Uso e da Política de Privacidade implica em uma autorização
              expressa à ficash para acessar e utilizar os Dados de Conta e os
              Dados Financeiros e Crédito Pessoais fornecidos por meio destes
              sites financeiros. A ficash poderá, a seu exclusivo critério, a
              qualquer tempo, e sem a necessidade de comunicação prévia ao
              Usuário: •Encerrar, modificar ou suspender, total ou parcialmente,
              o acesso do Usuário ao Site e/ou ao Aplicativo, quando referido
              acesso ou cadastro violar as condições estabelecidas nestes Termos
              de Uso e/ou na Política de Privacidade; •Excluir, total ou
              parcialmente, as informações cadastradas pelo Usuário que não
              estejam em consonância com as disposições deste Termo de Uso; e
              •Acrescentar, excluir ou modificar o Conteúdo oferecido na ficash.
              Poderá a ficash, ainda, a seu exclusivo critério, suspender,
              modificar ou encerrar as atividades do Site e/ou do Aplicativo,
              mediante comunicação prévia ao Usuário, salvo nas hipóteses de
              caso fortuito ou força maior. A qualquer tempo, mediante
              comunicação prévia ao Usuário no endereço de e-mail por este
              indicado em seu cadastro pessoal ou por meio de aviso no próprio
              Site e/ou no Aplicativo, a ficash poderá, ainda: •Definir preços
              para oferecimento de determinados conteúdos e/ou serviços, ainda
              que inicialmente tenham sido ofertados de forma gratuita, sendo a
              utilização dos mesmos, após o referido aviso, considerada como
              concordância do Usuário com tais preços; e, •Enviar ao Usuário
              mensagens de e-mail ou outras correspondências de caráter
              informativo, comercial e/ou promocional, salvo expressa
              solicitação em contrário pelo Usuário, nos termos da Política de
              Privacidade. Limitação de Responsabilidade O USUÁRIO ESTÁ CIENTE
              DE QUE O SOFTWARE APENAS OBTÉM E GERENCIA, DE FORMA AUTOMATIZADA,
              OS DADOS FINANCEIROS PESSOAIS E DE GESTÃO DE EMPRÉSTIMOS
              CONSIGNADOS DO USUÁRIO. O SOFTWARE NÃO REALIZA EMPRÉSTIMOS NEM SE
              RESPONSABILIZA PELOS PRODUTOS FINANCEIROS DAS INSTITUIÇÕES
              FINANCEIRAS PARCEIRAS EVENTUALMENTE CONTRATADOS. A ficash não
              responderá, em nenhuma hipótese, ainda que em caráter solidário ou
              subsidiário: •Pela autenticidade, validade e precisão dos dados
              fornecidos pelos Usuários e/ou coletadas nos sites das
              instituições financeiras, conforme previsto no Item 5 acima,
              competindo ao Usuário verificar, por conta própria, se tais
              informações são verdadeiras, completas e atualizadas antes de
              tomar qualquer decisão nelas baseada; •Pelos serviços ou produtos
              oferecidos no Site e/ou Aplicativo por anunciantes ou quaisquer
              terceiros, inclusive no que diz respeito a sua disponibilidade,
              qualidade, quantidade, características essenciais, ofertas,
              preços, formas de pagamento ou quaisquer outros elementos a ele
              referentes; •Por eventuais prejuízos sofridos pelos Usuários ou
              por terceiros em razão da tomada de decisões com base nas
              informações disponibilizadas no Site e no Aplicativo; •Por
              eventuais prejuízos sofridos pelos Usuários em razão de falhas no
              sistema de informática ou nos servidores que independam de culpa
              da ficash ou em sua conectividade com a internet de modo geral,
              devendo o Usuário manter, às suas expensas, linha de
              telecomunicação, modem, software de comunicação, endereço de
              correio eletrônico e outros recursos necessários à comunicação com
              a ficash; •Por situações de caso fortuito ou força maior, nos
              termos do artigo 393 do Código Civil Brasileiro; •Por danos
              causados por programas nocivos ao Software, tais como, mas sem se
              limitar a vírus, trojans e hackers; A ficash não garante que as
              funções contidas no Software atendam às necessidades do Usuário,
              que a operação do Software será ininterrupta ou livre de erros,
              que qualquer funcionalidade continuará disponível, que os defeitos
              no Software serão corrigidos ou que o Software será compatível ou
              funcionará com qualquer software, aplicações ou serviços de
              terceiros. A ficash fará todo o possível para manter os dados
              sempre seguros, inclusive, irá adotar medidas de segurança e de
              proteção compatíveis com a natureza dos dados coletados, usados e
              armazenados, no entanto, a ficash não garante de forma alguma que
              tais medidas de segurança sejam isentas de erros ou que não
              estejam sujeitas a interferência de terceiros (hackers entre
              outros). Por sua natureza, apesar dos melhores esforços da ficash,
              qualquer medida de segurança pode falhar e qualquer dado do
              Usuário fornecido ao ou coletado pela ficash pode se tornar
              público. AO ACEITAR O TERMO DE USO E/OU USAR A FICASH O USUÁRIO
              ENTENDE E ASSUME EXPRESSAMENTE ESSE RISCO E CONCORDA QUE A FICASH
              NÃO SERÁ RESPONSÁVEL POR TAL TIPO DE VAZAMENTO DE DADOS. A FICASH
              NÃO SE RESPONSABILIZA POR QUALQUER DECISÃO FINANCEIRA TOMADA PELO
              USUÁRIO COM BASE NAS INFORMAÇÕES OBTIDAS POR MEIO DA UTILIZAÇÃO DO
              SOFTWARE, incluindo, sem limitação, qualquer decisão tomada
              utilizando-se de eventual informação incorreta/desatualizada
              disponibilizada pela ficash. Será responsabilidade exclusiva do
              Usuário conferir qualquer informação disponibilizada pela ficash,
              junto à instituição bancária de origem dos respectivos Dados
              Financeiros Pessoais. Indenização O Usuário concorda em defender,
              indenizar e manter indene a ficash e suas afiliadas, diretores,
              empregados e agentes, de e contra quaisquer encargos, ações ou
              demandas, incluindo, mas não limitado a honorários advocatícios
              razoáveis, resultantes: (i) da sua eventual utilização indevida do
              Site, do Aplicativo, do Software e/ou do seu Conteúdo; ou (ii) da
              violação das condições ora pactuadas. Em nenhum caso a ficash será
              responsável por danos pessoais ou qualquer prejuízo incidental,
              indireto ou consequente, lucros cessantes, incluindo, sem
              limitação, prejuízos por perda de lucro, corrupção ou perda de
              dados, falha de transmissão ou recepção de dados, não continuidade
              do negócio ou qualquer outro prejuízo ou perda comercial
              incorridos pelos Usuários ou por terceiros, decorrentes ou
              relacionados ao uso ou sua inabilidade em usar o Software ou os
              serviços da ficash, por qualquer motivo. Na eventualidade da
              ficash ser compelida, por decisão judicial, a indenizar ou
              ressarcir o Usuário ou terceiros por danos sofridos, o valor
              devido será limitado à totalidade da quantia efetivamente paga
              pelo Usuário à ficash a título de fruição das funcionalidades
              oferecidas pelo Site e pelo Aplicativo. Vigência e Rescisão O
              Termo de Uso e a Política de Privacidade vigerão por prazo
              indeterminado, a partir do Aceite do Usuário, podendo ser
              modificados ou rescindidos unilateralmente pela ficash a qualquer
              tempo, sem qualquer ônus, mediante simples comunicação por meio do
              próprio Site/Aplicativo ou de mensagem para o e-mail indicado no
              cadastro pessoal do Usuário. O Usuário poderá, a qualquer momento,
              solicitar a exclusão da sua Conta ficash, encerrando seu
              relacionamento com a ficash, mediante solicitação realizada
              diretamente por meio do Site. Neste caso, os dados do Usuário
              serão tratados da forma prevista na Política de Privacidade.
              Modificações A ficash poderá, a qualquer tempo, alterar este Termo
              de Uso ou a Política de Privacidade, ao seu exclusivo critério.
              Quaisquer alterações nestes Termos de Uso e na Política de
              Privacidade serão informadas por meio do Site e/ou do Aplicativo.
              Caso o Usuário continue utilizando os serviços disponibilizados
              pelo Site e/ou pelo Aplicativo, a ficash considerará que o Usuário
              concorda com as alterações. Será sempre indicada a data da última
              atualização realizada pela ficash ao presente Termo de Uso. O
              Usuário entende e concorda que, assim que publicada a alteração
              deste Termo de Uso/Política de Privacidade no Site ou no
              Aplicativo, o uso do Site e do Aplicativo sujeitar-se-á ao Termo
              de Uso/Política de Privacidade atualizados. Disposições Gerais
              Este Termo de Uso não gera nenhum vínculo de sociedade, franquia
              ou relação de trabalho entre a ficash e o Usuário, seus parceiros
              e/ou anunciantes. Caso qualquer disposição deste Termo de Uso ou
              da Política de Privacidade seja considerada ilegal, nula ou
              inexequível por qualquer razão, as disposições restantes não serão
              afetadas e manter-seão válidas e aplicáveis na máxima extensão
              possível. O Termo de Uso e a Política de Privacidade constituem a
              totalidade do acordo sobre as condições de uso do Site, do
              Aplicativo e do Software. O Usuário declara ter ciência dos
              direitos e obrigações decorrentes do presente Termo de Uso e a
              Política de Privacidade, tendo lido, compreendido e aceito todos
              os termos e condições. Qualquer falha da ficash para impor ou
              exercer qualquer disposição deste Termo de Uso, da Política de
              Privacidade ou direitos conexos, não constitui uma renúncia a esse
              direito ou disposição. Lei e Foro Aplicáveis Este Termo de Uso
              será interpretado exclusivamente segundo as leis do Brasil. As
              partes elegem o Foro da Comarca de Brasília, Distrito Federal,
              como o único competente para dirimir qualquer litígio resultante
              deste Termo de Uso ou da Política de Privacidade. Última
              atualização: 06 de Junho de 2023
            </Text>
          </ScrollView>
          {/* <Button title="Hide modal" onPress={toggleModal} /> */}
        </View>
      </Modal>
    </View>
  );
}

export default TermosUso;
