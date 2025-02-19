import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AutoComplete, { Suggestion } from './index';

// Mock de sugestões
const mockSuggestions: Suggestion[] = [
  { id: '1', name: 'test1', description: 'teste 1 go', image: 'test1.jpg' },
  { id: '2', name: 'test2', description: 'teste 2 go', image: 'test2.jpg' },
  { id: '3', name: 'test3', description: 'teste 2 go', image: 'test3.jpg' },
];

// Função de seleção mock
const mockOnSelect = vi.fn();

describe('AutoComplete', () => {
  test('deve renderizar o componente corretamente', () => {
    render(<AutoComplete suggestions={mockSuggestions} id="autocomplete" onSelect={mockOnSelect} />);
    
    // Verificar se o campo de busca está presente
    expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument();
  });

  test('deve exibir "Nothing found" se não houver sugestões', async () => {
    render(<AutoComplete suggestions={[]} id="autocomplete" onSelect={mockOnSelect} />);
    
    // Digitar algo que não tenha sugestão
    const input = screen.getByPlaceholderText(/search/i) as HTMLInputElement;
    userEvent.type(input, 'XYZ');
    
    // Verificar se "Nothing found" aparece
    await waitFor(() => expect(screen.getByText('Nothing found')).toBeInTheDocument());
  });
});
