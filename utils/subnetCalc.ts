export interface SubnetResult {
  networkId: string;
  broadcast: string;
  subnetMask: string;
  firstUsable: string;
  lastUsable: string;
  totalHosts: number;
  cidr: number;
}

export interface ParsedCIDR {
  ip: string;
  cidr: number;
}

export function parseCIDR(input: string): ParsedCIDR | null {
  const trimmed = input.trim();
  const parts = trimmed.split('/');
  
  if (parts.length !== 2) {
    return null;
  }
  
  const ip = parts[0];
  const cidr = parseInt(parts[1], 10);
  
  if (isNaN(cidr) || cidr < 0 || cidr > 32) {
    return null;
  }
  
  if (!isValidIPv4(ip)) {
    return null;
  }
  
  return { ip, cidr };
}

export function isValidIPv4(ip: string): boolean {
  const octets = ip.split('.');
  
  if (octets.length !== 4) {
    return false;
  }
  
  for (const octet of octets) {
    const num = parseInt(octet, 10);
    if (isNaN(num) || num < 0 || num > 255 || octet !== num.toString()) {
      return false;
    }
  }
  
  return true;
}

export function ipToInt(ip: string): number {
  const octets = ip.split('.').map(o => parseInt(o, 10));
  return ((octets[0] << 24) | (octets[1] << 16) | (octets[2] << 8) | octets[3]) >>> 0;
}

export function intToIp(int: number): string {
  return [
    (int >>> 24) & 255,
    (int >>> 16) & 255,
    (int >>> 8) & 255,
    int & 255
  ].join('.');
}

export function cidrToSubnetMask(cidr: number): string {
  const mask = cidr === 0 ? 0 : (~0 << (32 - cidr)) >>> 0;
  return intToIp(mask);
}

export function calculateSubnet(ip: string, cidr: number): SubnetResult {
  const ipInt = ipToInt(ip);
  const maskInt = cidr === 0 ? 0 : (~0 << (32 - cidr)) >>> 0;
  const wildcardInt = (~maskInt) >>> 0;
  
  const networkInt = (ipInt & maskInt) >>> 0;
  const broadcastInt = (networkInt | wildcardInt) >>> 0;
  
  const networkId = intToIp(networkInt);
  const broadcast = intToIp(broadcastInt);
  const subnetMask = intToIp(maskInt);
  
  let firstUsable: string;
  let lastUsable: string;
  let totalHosts: number;
  
  if (cidr === 32) {
    firstUsable = networkId;
    lastUsable = networkId;
    totalHosts = 1;
  } else if (cidr === 31) {
    firstUsable = networkId;
    lastUsable = broadcast;
    totalHosts = 2;
  } else {
    firstUsable = intToIp(networkInt + 1);
    lastUsable = intToIp(broadcastInt - 1);
    totalHosts = Math.pow(2, 32 - cidr) - 2;
  }
  
  return {
    networkId,
    broadcast,
    subnetMask,
    firstUsable,
    lastUsable,
    totalHosts,
    cidr
  };
}
