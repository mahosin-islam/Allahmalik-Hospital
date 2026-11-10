export interface Doctor {
  id: string;
  slug: string;
  nameBN: string;
  nameEN: string;
  qualification: string;
  specialityBN: string;
  specialityEN: string;
  designation: string;
  departmentBN: string;
  departmentEN: string;
  hospital: string;
  experience: string;
  image: string;
  chamberTime: string;
  phone: string;
  about: string;
  fees: number;
}

export type DoctorInput = Partial<Omit<Doctor, "id">>;
