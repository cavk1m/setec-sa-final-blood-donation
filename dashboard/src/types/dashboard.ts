export type BloodType =
  | 'A+'
  | 'A-'
  | 'B+'
  | 'B-'
  | 'AB+'
  | 'AB-'
  | 'O+'
  | 'O-';

export type QueueStatus = 'waiting' | 'in-progress' | 'completed' | 'skip';

export type QueueEntry = {
  id: string;
  queue_number: number;
  created_at: string;
  survey_score: number; // 1-5 (integer)
  status: QueueStatus;
  user: {
    full_name: string;
    blood_type: BloodType;
  };
};

