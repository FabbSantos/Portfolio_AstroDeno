# Sálvia: landing de clínica

Landing editorial pra clínica e consultório (médica, odonto, estética, fisio, nutri, psicologia): títulos em serifa, fios finos no lugar de cards, foto larga no topo. O centro é o agendamento: o paciente escolhe especialidade e período, vê a mensagem impressa num tíquete e abre o WhatsApp com o texto pronto. Horário ao vivo ("Aberto agora · fecha às 19h"), SEO local (`MedicalClinic`) e rodapé com responsável técnico. Demo em `/templates/salvia/demo` (`demo.config.ts`, em português).

Referências do 21st.dev usadas no desenho: Editorial Hero (felipemenezes098), Services with Animated Hover Modal (cnippet-dev), Interactive Accordion (jatin-yadav05) e Large Name Footer. Tudo reescrito em Astro e CSS, sem React, GSAP ou Framer Motion.

Feito pro modelo de entrega rápida: **só hero, especialidades, agendamento e localização são obrigatórios**. Equipe, convênios, espaço e perguntas frequentes aparecem apenas quando o bloco existe no config. Os títulos das seções já têm texto padrão, então o config do cliente é quase só dado.

```
salvia/
  schema.ts           salviaSchema = core baseSiteSchema + seções · defineSalvia() · SalviaConfig
  hours.ts            rótulos de horário, "aberto agora" (roda no navegador) e JSON-LD MedicalClinic
  demo.config.ts      config do demo (clínica fictícia)
  SalviaBody.astro    fontes + seções + script do status de horário
  SalviaPage.astro    core Page + SalviaBody; falha o build sem contact.whatsapp
  styles.css          regras compartilhadas (grade, cabeçalho de seção, botão, link, status, topbar)
  sections/           Topbar · Hero · Services · Booking · Team · Insurance · Space · Faq · Location · Footer · _md.ts
```

## Fontes

Newsreader (títulos) e Hanken Grotesk (texto), via `@fontsource-variable`. O scaffold adiciona os dois pacotes ao `package.json` do cliente. O tema deve usar `radius` perto de 2 e um `accent` discreto: o botão é escuro (`ink`), o accent aparece em detalhes.

## Config

Base (core): `brand`, `theme`, `seo`, `contact`, `analytics`, `legal`, `nav`. Strings **md** aceitam `**texto**` (itálico na cor de destaque), `==texto==` (marca-texto) e `\n`. Todo bloco com `title` aceita `lead?` e tem título padrão.

| Seção | Campos |
| --- | --- |
| `topbar` | `cta` (padrão `'Agendar'`, leva a `#agendar`) |
| `hero` | `tagline`, `title` (md), `sub`, `photo?` (paisagem 2000×900), `photoAlt`, `highlights: string[]` (até 4, numa linha), `cta`, `secondaryCta` |
| `services` | `items: [{ name, desc, photo? }]` (1 a 12; foto em retrato 800×1000 que segue o cursor; sem foto aparece um cartão com o nome), `bookLabel` |
| `booking` | tudo com padrão: `periods` (`['Manhã','Tarde']`), `message` (`{servico}` `{periodo}`), `nameSentence` (`{nome}`), rótulos, `cta`, `foot?` |
| `team?` | `people: [{ name, role, registry?, photo?, bio? }]` (1 a 8) |
| `insurance?` | `plans: string[]` (viram uma frase: "A, B e C."), `note?` |
| `space?` | `photos: [{ image, alt, caption? }]` (1 a 3, em composição assimétrica) |
| `faq?` | `items: [{ q, a }]` |
| `location` | `address: { street, district?, city, state (UF), zip? }`, `mapsUrl?`, `directions: string[]`, `hours: [{ days: ['mon'…'sun'], opens: '08:00', closes: '19:00' }]`, `timezone` (padrão `America/Sao_Paulo`), `hoursNote?` |
| `footer` | `line`, `wordmark?` (nome gigante; padrão `brand.name`, palavra curta fica melhor), `technicalLead?`; `legal.company`, `legal.cnpj`, `legal.lines` e o link de privacidade vão nas colunas |

`contact.whatsapp` é **obrigatório no site do cliente**: o agendamento abre o WhatsApp. O demo do portfólio roda sem número (mostra um aviso no lugar).

`seo.jsonLd` é gerado sozinho como `MedicalClinic` (nome, endereço, horários, telefone, e-mail, mapa). Só preencha se quiser outro tipo, como `Dentist`.

## O que pedir ao cliente

| Item | Formato |
| --- | --- |
| Nome da clínica, bairro e cidade | texto |
| Especialidades (nome + uma frase) | texto |
| Horários por dia | texto |
| Endereço, link do Google Maps, como chegar | texto |
| WhatsApp da recepção | número com DDD |
| Responsável técnico (nome + CRM/CRO) | texto |
| Razão social e CNPJ | texto |
| Foto larga da recepção ou fachada (`recepcao-larga.jpg`) | JPG 2000×900 |
| Opcional: uma foto por especialidade (`servico-*.jpg`), sem pacientes | JPG retrato 800×1000 |
| Opcional: equipe, convênios, perguntas frequentes, fotos do espaço | texto + fotos |

## Publicidade em saúde

Os textos padrão seguem a linha dos conselhos (CFM, CRO): informativos, sem promessa de resultado. Ao adaptar para um cliente:

- nada de fotos de antes e depois nem de pacientes;
- nada de "garantido", "o melhor", "sem dor" ou preço como chamariz;
- nome e registro de cada profissional e do responsável técnico visíveis;
- depoimento de paciente fica de fora (por isso o template não tem essa seção).

Na dúvida, a regra que vale é a do conselho da área do cliente.

## O que o scaffold gera

`node scripts/new-client.mjs --template salvia --form whatsapp …` → `client-starter/` com `src/templates/core/` + `src/templates/salvia/` vendorados (sem `demo.config.ts`/`assets/demo`), as fontes no `package.json`, `src/site.config.ts` com o conteúdo do demo e campos `TODO_` (incluindo `contact.whatsapp.number`), `src/assets/README.md`, páginas `index` (`SalviaPage`), `privacidade`, `obrigado` e `404`. Equipe, convênios, espaço e perguntas vêm do demo: apague os blocos que o cliente não tiver.
