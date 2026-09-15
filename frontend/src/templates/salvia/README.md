# Sálvia Agenda: página pra quem atende com hora marcada

Landing editorial pra qualquer negócio que vive de agenda: clínica, consultório, salão, barbearia, estúdio de estética ou tatuagem, pet shop, escritório. Títulos em serifa, fios finos no lugar de cards, foto larga no topo. O centro é o agendamento: o cliente escolhe o serviço e o período, vê a mensagem impressa num tíquete e abre o WhatsApp com o texto pronto. Horário ao vivo ("Aberto agora · fecha às 19h") e SEO local (`LocalBusiness` ou o subtipo que o negócio tiver).

O template é a estrutura; o conteúdo é de exemplo. São duas demos, em português:

| Exemplo | URL | Config |
| --- | --- | --- |
| Clínica | `/templates/salvia/demo` | `demo.config.ts` (`MedicalClinic`, equipe com registro, convênios, responsável técnico) |
| Salão | `/templates/salvia/demo/salao` | `demo.salao.config.ts` (`BeautySalon`, equipe sem registro, formas de pagamento) |

Referências do 21st.dev usadas no desenho: Editorial Hero (felipemenezes098), Services with Animated Hover Modal (cnippet-dev), Interactive Accordion (jatin-yadav05) e Large Name Footer. Tudo reescrito em Astro e CSS, sem React, GSAP ou Framer Motion.

Feito pro modelo de entrega rápida: **só hero, serviços, agendamento e localização são obrigatórios**. Equipe, convênios (ou formas de pagamento), espaço e perguntas frequentes aparecem apenas quando o bloco existe no config. Os títulos das seções já têm texto padrão neutro, então o config do cliente é quase só dado.

```
salvia/
  schema.ts              salviaSchema = core baseSiteSchema + seções · defineSalvia() · SalviaConfig
  hours.ts               rótulos de horário, "aberto agora" (roda no navegador) e JSON-LD do negócio
  demo.config.ts         exemplo Clínica (clínica fictícia)
  demo.salao.config.ts   exemplo Salão (salão fictício)
  SalviaBody.astro       fontes + seções + script do status de horário
  SalviaPage.astro       core Page + SalviaBody; falha o build sem contact.whatsapp
  styles.css             regras compartilhadas (grade, cabeçalho de seção, botão, link, status, topbar)
  sections/              Topbar · Hero · Services · Booking · Team · Insurance · Space · Faq · Location · Footer · _md.ts
```

## Fontes

Newsreader (títulos) e Hanken Grotesk (texto), via `@fontsource-variable`. O scaffold adiciona os dois pacotes ao `package.json` do cliente. O tema deve usar `radius` perto de 2 e um `accent` discreto: o botão é escuro (`ink`), o accent aparece em detalhes.

## Config

Base (core): `brand`, `theme`, `seo`, `contact`, `analytics`, `legal`, `nav`. Strings **md** aceitam `**texto**` (itálico na cor de destaque), `==texto==` (marca-texto) e `\n`. Todo bloco com `title` aceita `lead?` e tem título padrão.

| Seção | Campos |
| --- | --- |
| `businessType` | tipo do schema.org pro Google (padrão `'LocalBusiness'`): `MedicalClinic`, `Dentist`, `BeautySalon`, `HairSalon`, `NailSalon`, `LegalService`, `VeterinaryCare`… |
| `topbar` | `cta` (padrão `'Agendar'`, leva a `#agendar`) |
| `hero` | `tagline`, `title` (md), `sub`, `photo?` (paisagem 2000×900), `photoAlt`, `highlights: string[]` (até 4, numa linha), `cta`, `secondaryCta` (padrão `'Ver serviços'`) |
| `services` | `title` (padrão `'Serviços'`; clínica usa `'Especialidades'`), `items: [{ name, desc, photo? }]` (1 a 12; foto em retrato 800×1000 que segue o cursor; sem foto aparece um cartão com o nome), `bookLabel`. Âncora `#servicos` |
| `booking` | tudo com padrão: `periods` (`['Manhã','Tarde']`), `serviceLabel` (`'Serviço'`), `message` (`{servico}` `{periodo}`), `nameSentence` (`{nome}`), rótulos, `cta`, `foot?` |
| `team?` | `people: [{ name, role, registry?, photo?, bio? }]` (1 a 8; `registry` só quando houver: CRM, CRO, OAB…) |
| `insurance?` | `title` (padrão `'Convênios'`), `anchor` (padrão `'convenios'`), `plans: string[]` (viram uma frase: "A, B e C."), `note?`. Serve pra convênios, formas de pagamento, marcas atendidas |
| `space?` | `photos: [{ image, alt, caption? }]` (1 a 3, em composição assimétrica) |
| `faq?` | `items: [{ q, a }]` |
| `location` | `address: { street, district?, city, state (UF), zip? }`, `mapsUrl?`, `directions: string[]`, `hoursTitle`, `hours: [{ days: ['mon'…'sun'], opens: '08:00', closes: '19:00' }]`, `timezone` (padrão `America/Sao_Paulo`), `hoursNote?` |
| `footer` | `line`, `wordmark?` (nome gigante; padrão `brand.name`, palavra curta fica melhor), `technicalLead?` (responsável técnico, pra saúde), `technicalLeadLabel?`; sem responsável técnico a coluna se chama "Empresa". `legal.company`, `legal.cnpj`, `legal.lines` e o link de privacidade vão nas colunas |

`contact.whatsapp` é **obrigatório no site do cliente**: o agendamento abre o WhatsApp. As demos do portfólio rodam sem número (mostram um aviso no lugar).

`seo.jsonLd` é gerado sozinho com o `businessType` (nome, endereço, horários, telefone, e-mail, mapa). Só preencha se quiser algo além disso.

## O que pedir ao cliente

| Item | Formato |
| --- | --- |
| Nome do negócio, bairro e cidade | texto |
| Serviços (nome + uma frase) | texto |
| Horários por dia | texto |
| Endereço, link do Google Maps, como chegar | texto |
| WhatsApp de quem agenda | número com DDD |
| Razão social e CNPJ | texto |
| Foto larga do espaço ou da fachada (`*-larga.jpg`) | JPG 2000×900 |
| Opcional: uma foto por serviço (`*servico-*.jpg`), sem clientes | JPG retrato 800×1000 |
| Opcional: equipe, convênios ou formas de pagamento, perguntas frequentes, fotos do espaço | texto + fotos |
| Só saúde: responsável técnico (nome + CRM/CRO) e registro de cada profissional | texto |

## Se o cliente for da saúde

Os textos do exemplo Clínica seguem a linha dos conselhos (CFM, CRO): informativos, sem promessa de resultado. Ao adaptar pra uma clínica:

- nada de fotos de antes e depois nem de pacientes;
- nada de "garantido", "o melhor", "sem dor" ou preço como chamariz;
- nome e registro de cada profissional e do responsável técnico visíveis;
- depoimento de paciente fica de fora (por isso o template não tem essa seção).

Na dúvida, a regra que vale é a do conselho da área do cliente.

## O que o scaffold gera

`node scripts/new-client.mjs --template salvia --form whatsapp …` → `client-starter/` com `src/templates/core/` + `src/templates/salvia/` vendorados (sem configs de demo nem `assets/demo`), as fontes no `package.json`, `src/site.config.ts` com o conteúdo do exemplo Clínica e campos `TODO_` (incluindo `contact.whatsapp.number`), `src/assets/README.md`, páginas `index` (`SalviaPage`), `privacidade`, `obrigado` e `404`. Com `--example salao`, o `site.config.ts` parte do exemplo Salão. Equipe, convênios, espaço e perguntas vêm do exemplo: apague os blocos que o cliente não tiver.
