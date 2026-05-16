export type AdvantageButtonGradient = 'green' | 'blue' | 'red' | 'purple';

export interface AdvantageSlide {
  id: number;
  title: string;
  menuLabel: string;
  description: string;
  buttonText: string;
  buttonHref: string;
  image: string;
  buttonGradient: AdvantageButtonGradient;
}
