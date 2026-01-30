export interface PortItem {
  port: number;
  protocol: string;
  service: string;
  description: string;
  category?: 'security' | 'web' | 'database' | 'mail' | 'file' | 'remote' | 'management';
}

export const PORTS_DATA: PortItem[] = [
  {
    port: 22,
    protocol: "TCP",
    service: "SSH",
    description: "Secure Shell protocol for encrypted remote administration",
    category: "remote"
  },
  {
    port: 80,
    protocol: "TCP",
    service: "HTTP",
    description: "HyperText Transfer Protocol - Unencrypted web traffic",
    category: "web"
  },
  {
    port: 443,
    protocol: "TCP",
    service: "HTTPS",
    description: "HTTP Secure - SSL/TLS encrypted web traffic",
    category: "web"
  },
  {
    port: 3306,
    protocol: "TCP",
    service: "MySQL",
    description: "MySQL Database Server default port",
    category: "database"
  },
  {
    port: 53,
    protocol: "UDP/TCP",
    service: "DNS",
    description: "Domain Name System - Resolves hostnames to IPs",
    category: "web"
  },
  {
    port: 23,
    protocol: "TCP",
    service: "Telnet",
    description: "Unencrypted remote terminal access (legacy/insecure)",
    category: "remote"
  },
  {
    port: 21,
    protocol: "TCP",
    service: "FTP",
    description: "File Transfer Protocol - Command channel",
    category: "file"
  },
  {
    port: 20,
    protocol: "TCP",
    service: "FTP-Data",
    description: "File Transfer Protocol - Data channel",
    category: "file"
  },
  {
    port: 25,
    protocol: "TCP",
    service: "SMTP",
    description: "Simple Mail Transfer Protocol - Email sending",
    category: "mail"
  },
  {
    port: 3389,
    protocol: "TCP/UDP",
    service: "RDP",
    description: "Remote Desktop Protocol - Windows remote access",
    category: "remote"
  },
  {
    port: 110,
    protocol: "TCP",
    service: "POP3",
    description: "Post Office Protocol v3 - Email retrieval",
    category: "mail"
  },
  {
    port: 143,
    protocol: "TCP",
    service: "IMAP",
    description: "Internet Message Access Protocol - Email access",
    category: "mail"
  },
  {
    port: 993,
    protocol: "TCP",
    service: "IMAPS",
    description: "IMAP over SSL - Secure email access",
    category: "mail"
  },
  {
    port: 995,
    protocol: "TCP",
    service: "POP3S",
    description: "POP3 over SSL - Secure email retrieval",
    category: "mail"
  },
  {
    port: 445,
    protocol: "TCP",
    service: "SMB",
    description: "Server Message Block - Windows file sharing",
    category: "file"
  },
  {
    port: 161,
    protocol: "UDP",
    service: "SNMP",
    description: "Simple Network Management Protocol - Monitoring",
    category: "management"
  },
  {
    port: 162,
    protocol: "UDP",
    service: "SNMP-Trap",
    description: "SNMP Trap notifications",
    category: "management"
  },
  {
    port: 587,
    protocol: "TCP",
    service: "SMTP-Submission",
    description: "Mail submission with authentication",
    category: "mail"
  }
];

export const getPortByNumber = (portNum: number): PortItem | undefined => {
  return PORTS_DATA.find(p => p.port === portNum);
};

export const searchPorts = (query: string): PortItem[] => {
  const lowerQuery = query.toLowerCase();
  return PORTS_DATA.filter(p => 
    p.port.toString().includes(lowerQuery) ||
    p.service.toLowerCase().includes(lowerQuery) ||
    p.description.toLowerCase().includes(lowerQuery) ||
    p.protocol.toLowerCase().includes(lowerQuery)
  );
};
