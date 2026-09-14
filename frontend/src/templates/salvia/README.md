# Sálvia: landing de clínica

Landing enxuta pra clínica e consultório (médica, odonto, estética, fisio, nutri, psicologia). O centro é o agendamento: o paciente escolhe especialidade e período, vê a mensagem num balão de WhatsApp e abre a conversa com o texto pronto. Horário ao vivo ("Aberto agora · fecha às 19h"), SEO local (`MedicalClinic`) e rodapé com responsável técnico. Demo em `/templates/salvia/demo` (`demo.config.ts`, em português).

Feito pro modelo de entrega rápida: **só hero, especialidades, agendamento e localização são obrigatórios**. Equipe, convênios, espaço e dúvidas frequentes aparecem apenas quando o bloco existe no config. Os títulos das seções já têm texto padrão em português, então o config do cliente é quase só dado.

```
salvia/
  schema.ts           salviaSchema = core baseSiteSchema + seções · defineSalvia() · SalviaConfig
  hours.ts            rótulos de horário, "aberto agora" (roda no navegador) e JSON-LD MedicalClinic
  demo.config.ts      config do demo (clínica fictícia)
  SalviaBody.astro    <div class='tpl tpl-salvia'> com as seções + script do status de horário
  SalviaPage.astro    core Page + SalviaBody; falha o build sem contact.whatsapp
  styles.css          regras compartilhadas (wrap, sec-h, eyebrow, botões, status)
  sections/           Topbar · Hero · Services · Booking · Team · Insurance · Space · Faq · Location · Footer · icons.ts · _md.ts
```

## Config

Base (core): `brand`, `theme`, `seo`, `contact`, `analytics`, `legal`, `nav`. Strings **md** aceitam `**texto**` (cor de destaque), `==texto==` (marca-texto) e `\n`. Todo bloco com `eyebrow`/`title` aceita `lead?` e tem padrão em pt-BR.

| Seção | Campos |
| --- | --- |
| `topbar` | `cta` (padrão `'Agendar'`, leva a `#agendar`) |
| `hero` | `eyebrow`, `title` (md), `sub`, `photo?` (retrato 4:5; sem foto vira um arco em degradê), `photoAlt`, `highlights: string[]` (até 4), `cta`, `secondaryCta` |
| `services` | `items: [{ name, desc, icon }]` (1 a 12), `bookLabel`. Ícones: `stethoscope` `pulse` `tooth` `heart` `drop` `sparkle` `bone` `leaf` `apple` `person` `eye` `brain` |
| `booking` | tudo com padrão: `periods` (`['Manhã','Tarde']`), `message` (`{servico}` `{periodo}`), `nameSentence` (`{nome}`), rótulos, `cta`, `foot?` |
| `team?` | `people: [{ name, role, registry?, photo?, bio? }]` (1 a 8; sem foto mostra as iniciais) |
| `insurance?` | `plans: string[]`, `note?` |
| `space?` | `photos: [{ image, alt }]` (1 a 3) |
| `faq?` | `items: [{ q, a }]` |
| `location` | `address: { street, district?, city, state (UF), zip? }`, `mapsUrl?`, `directions: string[]`, `hours: [{ days: ['mon'…'sun'], opens: '08:00', closes: '19:00' }]`, `timezone` (padrão `America/Sao_Paulo`), `hoursNote?` |
| `footer` | `line`, `technicalLead?` (nome + registro do responsável técnico); `legal.company`, `legal.cnpj`, `legal.lines` e o link de privacidade saem embaixo |

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
| Opcional: equipe (nome, área, registro, foto quadrada), convênios, dúvidas frequentes | texto + fotos |
| Opcional: fotos do espaço (`recepcao.jpg`, `sala-*.jpg`) | JPG retrato, 1200×1500 |

## Publicidade em saúde

Os textos padrão já seguem a linha dos conselhos (CFM, CRO): informativos, sem promessa de resultado. Ao adaptar para um cliente:

- nada de fotos de antes e depois nem de pacientes;
- nada de "garantido", "o melhor", "sem dor" ou preço como chamariz;
- nome e registro de cada profissional e do responsável técnico visíveis;
- depoimento de paciente fica de fora (por isso o template não tem essa seção).

Na dúvida, a regra que vale é a do conselho da área do cliente.

## O que o scaffold gera

`node scripts/new-client.mjs --template salvia --form whatsapp …` → `client-starter/` com `src/templates/core/` + `src/templates/salvia/` vendorados (sem `demo.config.ts`/`assets/demo`), `src/site.config.ts` com o conteúdo do demo e campos `TODO_` (incluindo `contact.whatsapp.number`), `src/assets/README.md`, páginas `index` (`SalviaPage`), `privacidade`, `obrigado` e `404`. Equipe, convênios, espaço e dúvidas vêm do demo: apague os blocos que o cliente não tiver.
