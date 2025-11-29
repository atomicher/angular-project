import { TruncatePipe } from './truncate.pipe';

describe('TruncatePipe', () => {
  const pipe = new TruncatePipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should truncate text that exceeds the limit', () => {
    const text = 'Дуже довгий текст для перевірки пайпа';
    // Обрізаємо до 10 символів
    const result = pipe.transform(text, 10);
    expect(result).toBe('Дуже довги...'); 
  });

  it('should NOT truncate text that fits within the limit', () => {
    const text = 'Короткий';
    const result = pipe.transform(text, 20);
    expect(result).toBe('Короткий');
  });
});