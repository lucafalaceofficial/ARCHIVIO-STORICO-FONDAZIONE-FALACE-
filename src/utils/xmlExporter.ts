/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

interface XMLData {
  portal: {
    name: string;
    description: string;
    founder: string;
    established: string;
    legalStatus: string;
    philosophicalFramework: string;
    patentCredits: string;
  };
  sections: {
    id: string;
    title: string;
    hemisphere: string;
    desc: string;
  }[];
  subsections: {
    id: string;
    sectionId: string;
    name: string;
  }[];
  creators: {
    id: string;
    fullName: string;
    username: string;
    category: string;
    followers: string;
    following: string;
    activeBio: string;
    website: string;
    gender: string;
  }[];
  posts: {
    id: string;
    title: string;
    author: string;
    section: string;
    sectionName: string;
    technique: string;
    description: string;
    likes: number;
    priorityId?: string;
    timestamp: string;
    comments: {
      author: string;
      text: string;
      timestamp: string;
    }[];
  }[];
}

export function generateXMLContent(data: XMLData): string {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<HumanaHubAIC>\n';

  // Helper to escape XML special characters
  const escapeXml = (str: string): string => {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  };

  // 1. Portal Meta
  xml += '  <PortalMetadata>\n';
  xml += `    <Nome>${escapeXml(data.portal.name)}</Nome>\n`;
  xml += `    <Descrizione>${escapeXml(data.portal.description)}</Descrizione>\n`;
  xml += `    <Fondatore>${escapeXml(data.portal.founder)}</Fondatore>\n`;
  xml += `    <Fondazione>${escapeXml(data.portal.established)}</Fondazione>\n`;
  xml += `    <InquadramentoGiuridico>${escapeXml(data.portal.legalStatus)}</InquadramentoGiuridico>\n`;
  xml += `    <FilosofiaSincronismo>${escapeXml(data.portal.philosophicalFramework)}</FilosofiaSincronismo>\n`;
  xml += `    <BrevettiERicerca>${escapeXml(data.portal.patentCredits)}</BrevettiERicerca>\n`;
  xml += '  </PortalMetadata>\n';

  // 2. Academic Sections
  xml += '  <SezioniAccademiche>\n';
  data.sections.forEach(sec => {
    xml += `    <Sezione id="${sec.id}">\n`;
    xml += `      <Titolo>${escapeXml(sec.title)}</Titolo>\n`;
    xml += `      <EmisferoCerebrale>${escapeXml(sec.hemisphere)}</EmisferoCerebrale>\n`;
    xml += `      <DescrizioneDettagliata>${escapeXml(sec.desc)}</DescrizioneDettagliata>\n`;
    
    // Nested specific subsections
    const items = data.subsections.filter(sub => sub.sectionId === sec.id);
    if (items.length > 0) {
      xml += '      <PraticheSpecifiche>\n';
      items.forEach(sub => {
        xml += `        <Pratica id="${sub.id}">${escapeXml(sub.name)}</Pratica>\n`;
      });
      xml += '      </PraticheSpecifiche>\n';
    }
    xml += '    </Sezione>\n';
  });
  xml += '  </SezioniAccademiche>\n';

  // 3. Profiles / Faculty Members
  xml += '  <MembriEAccademici>\n';
  data.creators.forEach(c => {
    xml += `    <Profilo id="${c.id}">\n`;
    xml += `      <NomeCompleto>${escapeXml(c.fullName)}</NomeCompleto>\n`;
    xml += `      <HandleSocial>@${escapeXml(c.username)}</HandleSocial>\n`;
    xml += `      <Categoria>${escapeXml(c.category)}</Categoria>\n`;
    xml += `      <Genere>${escapeXml(c.gender)}</Genere>\n`;
    xml += `      <BiografiaAccademica>${escapeXml(c.activeBio)}</BiografiaAccademica>\n`;
    xml += `      <Metriche>\n`;
    xml += `        <Follower>${escapeXml(c.followers)}</Follower>\n`;
    xml += `        <Seguiti>${escapeXml(c.following)}</Seguiti>\n`;
    xml += `      </Metriche>\n`;
    xml += `      <SitoWebSincrono>${escapeXml(c.website)}</SitoWebSincrono>\n`;
    xml += '    </Profilo>\n';
  });
  xml += '  </MembriEAccademici>\n';

  // 4. Social Hub Feed (Bacheca dei contenuti)
  xml += '  <BachecaPostOpere>\n';
  data.posts.forEach(p => {
    xml += `    <Articolo id="${p.id}">\n`;
    xml += `      <Titolo>${escapeXml(p.title)}</Titolo>\n`;
    xml += `      <Autore>${escapeXml(p.author)}</Autore>\n`;
    xml += `      <InquadramentoSezione codice="${p.section}">${escapeXml(p.sectionName)}</InquadramentoSezione>\n`;
    xml += `      <TecnicaPratica>${escapeXml(p.technique)}</TecnicaPratica>\n`;
    xml += `      <DescrizioneContenuto>${escapeXml(p.description)}</DescrizioneContenuto>\n`;
    xml += `      <Apprezzamenti>${p.likes}</Apprezzamenti>\n`;
    if (p.priorityId) {
      xml += `      <CertificatoPrioritaSIAE>${escapeXml(p.priorityId)}</CertificatoPrioritaSIAE>\n`;
    }
    xml += `      <DataPubblicazione>${escapeXml(p.timestamp)}</DataPubblicazione>\n`;
    
    if (p.comments && p.comments.length > 0) {
      xml += '      <CommentiDialogo>\n';
      p.comments.forEach((c, idx) => {
        xml += `        <Commento id="c_${idx}">\n`;
        xml += `          <Mittente>${escapeXml(c.author)}</Mittente>\n`;
        xml += `          <Testo>${escapeXml(c.text)}</Testo>\n`;
        xml += `          <Orario>${escapeXml(c.timestamp)}</Orario>\n`;
        xml += '        </Commento>\n';
      });
      xml += '      </CommentiDialogo>\n';
    }
    xml += '    </Articolo>\n';
  });
  xml += '  </BachecaPostOpere>\n';

  xml += '</HumanaHubAIC>\n';
  return xml;
}

export function triggerXMLDownload(data: XMLData) {
  const xmlContent = generateXMLContent(data);
  const blob = new Blob([xmlContent], { type: 'application/xml;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", "humanahub_aic_entire_portal.xml");
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function exportSiteToXml() {
  const dummyData: XMLData = {
    portal: {
      name: "Fondazione Falace delle AIC",
      description: "Portale Istituzionale Sincrono e Feed Unificato",
      founder: "Dott. Luca Falace",
      established: "Roma / Ginevra",
      legalStatus: "Fondazione Riconosciuta",
      philosophicalFramework: "9 Livelli di Sincronicità",
      patentCredits: "UIBM Brevetti di Invenzione Industriale"
    },
    sections: [],
    subsections: [],
    creators: [],
    posts: []
  };
  triggerXMLDownload(dummyData);
}
