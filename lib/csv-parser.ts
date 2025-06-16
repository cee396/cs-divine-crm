
export interface CsvRow {
  [key: string]: string;
}

export interface ParsedLead {
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  notes?: string;
}

export function parseCSV(csvContent: string): CsvRow[] {
  const lines = csvContent.trim().split('\n');
  if (lines.length < 2) return [];

  const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
  const rows: CsvRow[] = [];

  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]);
    if (values.length === headers.length) {
      const row: CsvRow = {};
      headers.forEach((header, index) => {
        row[header] = values[index];
      });
      rows.push(row);
    }
  }

  return rows;
}

function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  
  result.push(current.trim());
  return result;
}

export function mapRowToLead(row: CsvRow): ParsedLead | null {
  // Common field mappings
  const fieldMappings = {
    firstName: ['first_name', 'firstname', 'first', 'fname', 'given_name'],
    lastName: ['last_name', 'lastname', 'last', 'lname', 'surname', 'family_name'],
    email: ['email', 'email_address', 'e_mail', 'mail'],
    phone: ['phone', 'phone_number', 'telephone', 'mobile', 'cell', 'contact_number'],
    address: ['address', 'street_address', 'street', 'addr', 'property_address'],
    city: ['city', 'town', 'municipality'],
    state: ['state', 'province', 'region'],
    zipCode: ['zip', 'zip_code', 'postal_code', 'zipcode'],
    notes: ['notes', 'comments', 'remarks', 'description']
  };

  const lead: ParsedLead = {
    firstName: '',
    lastName: ''
  };

  // Convert row keys to lowercase for matching
  const lowerRow: { [key: string]: string } = {};
  Object.keys(row).forEach(key => {
    lowerRow[key.toLowerCase()] = row[key];
  });

  // Map fields
  Object.entries(fieldMappings).forEach(([leadField, possibleKeys]) => {
    for (const key of possibleKeys) {
      if (lowerRow[key]) {
        (lead as any)[leadField] = lowerRow[key].trim();
        break;
      }
    }
  });

  // Handle full name if first/last not found separately
  if (!lead.firstName && !lead.lastName) {
    const nameFields = ['name', 'full_name', 'fullname', 'contact_name'];
    for (const field of nameFields) {
      if (lowerRow[field]) {
        const nameParts = lowerRow[field].trim().split(' ');
        lead.firstName = nameParts[0] || '';
        lead.lastName = nameParts.slice(1).join(' ') || '';
        break;
      }
    }
  }

  // Validate required fields
  if (!lead.firstName && !lead.lastName) {
    return null;
  }

  // Clean phone number
  if (lead.phone) {
    lead.phone = lead.phone.replace(/\D/g, '');
    if (lead.phone.length === 10) {
      lead.phone = `(${lead.phone.slice(0, 3)}) ${lead.phone.slice(3, 6)}-${lead.phone.slice(6)}`;
    }
  }

  return lead;
}

export function validateLead(lead: ParsedLead): string[] {
  const errors: string[] = [];

  if (!lead.firstName.trim()) {
    errors.push('First name is required');
  }

  if (!lead.lastName.trim()) {
    errors.push('Last name is required');
  }

  if (lead.email && !isValidEmail(lead.email)) {
    errors.push('Invalid email format');
  }

  if (lead.phone && !isValidPhone(lead.phone)) {
    errors.push('Invalid phone format');
  }

  return errors;
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidPhone(phone: string): boolean {
  const cleanPhone = phone.replace(/\D/g, '');
  return cleanPhone.length === 10;
}
