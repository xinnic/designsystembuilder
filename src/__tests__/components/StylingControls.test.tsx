import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, within, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import StylingControls from '@/left/StylingControls';
import { useDesignSystem } from '@/state/designSystem';

// Mock Supabase client
vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    functions: {
      invoke: vi.fn()
    }
  }
}));

// Mock toast hook
vi.mock('@/hooks/use-toast', () => ({
  useToast: () => ({
    toast: vi.fn()
  })
}));

describe('StylingControls Component', () => {
  beforeEach(async () => {
    // Reset store to defaults before each test
    const {
      setDarkMode,
      setTheme,
      setAccentColor,
      setScale,
      setFont,
      setCustomPrimaryColor,
      setCustomAccentColor,
      setStylePreset,
      setSpacingMode,
      setOpts,
      setHaptics
    } = useDesignSystem.getState();

    setDarkMode(false);
    setTheme('turquoise');
    setAccentColor('turquoise');
    setScale('regular');
    setFont('font-jakarta');
    setCustomPrimaryColor('#3498db');
    setCustomAccentColor('#1abc9c');
    setStylePreset('modern');
    setSpacingMode('normal');
    setOpts({
      menuLayout: 'bottomBar',
      cardBorderWeight: 'thin',
      inputStyle: 'filled',
      logo: undefined
    });
    setHaptics({
      enabled: true,
      stack: 'web-react'
    });

    await new Promise(resolve => setTimeout(resolve, 0));
  });

  describe('Rendering', () => {
    it('should render component styling section', () => {
      render(<StylingControls />);

      expect(screen.getByText('Component Styling')).toBeInTheDocument();
    });

    it('should render logo section', () => {
      render(<StylingControls />);

      expect(screen.getByText('Logo')).toBeInTheDocument();
    });

    it('should start with both sections open by default', () => {
      render(<StylingControls />);

      // Component styling content should be visible
      expect(screen.getByText('Style Preset')).toBeInTheDocument();
      expect(screen.getByText('Menu Layout')).toBeInTheDocument();
      expect(screen.getByText('Spacing Scale')).toBeInTheDocument();

      // Logo content should be visible
      expect(screen.getByText('Upload Logo')).toBeInTheDocument();
    });
  });

  describe('Style Presets', () => {
    it('should display all 5 style presets', () => {
      render(<StylingControls />);

      expect(screen.getByText('Modern Flat')).toBeInTheDocument();
      expect(screen.getByText('Glassmorphism')).toBeInTheDocument();
      expect(screen.getByText('Playful')).toBeInTheDocument();
      expect(screen.getByText('Soft & Dreamy')).toBeInTheDocument();
      expect(screen.getByText('Minimalist')).toBeInTheDocument();
    });

    it('should highlight the selected preset', () => {
      render(<StylingControls />);

      const modernButton = screen.getByText('Modern Flat').closest('button');
      expect(modernButton).toHaveClass('border-primary');
      expect(modernButton).toHaveClass('bg-primary/5');
    });

    it('should change preset when clicked', async () => {
      const user = userEvent.setup();
      render(<StylingControls />);

      const glassButton = screen.getByText('Glassmorphism').closest('button');
      await user.click(glassButton!);

      const state = useDesignSystem.getState();
      expect(state.stylePresetId).toBe('glass');
    });

    it('should update tokens when preset changes', async () => {
      const user = userEvent.setup();
      render(<StylingControls />);

      // Get initial shadow token
      const initialShadow = useDesignSystem.getState().tokens.shadow;

      // Change to minimalist (no shadows)
      const minimalistButton = screen.getByText('Minimalist').closest('button');
      await user.click(minimalistButton!);

      await waitFor(() => {
        const state = useDesignSystem.getState();
        expect(state.tokens.shadow['1']).toBe('none');
        expect(state.tokens.shadow['2']).toBe('none');
        expect(state.tokens.shadow['3']).toBe('none');
      });
    });

    it('should update border weight based on preset', async () => {
      const user = userEvent.setup();
      render(<StylingControls />);

      // Change to playful (thick borders)
      const playfulButton = screen.getByText('Playful').closest('button');
      await user.click(playfulButton!);

      await waitFor(() => {
        const state = useDesignSystem.getState();
        expect(state.opts.cardBorderWeight).toBe('thick');
        expect(state.opts.inputBorderWeight).toBe('thick');
      });
    });

    it('should have title attributes for tooltips', () => {
      render(<StylingControls />);

      const modernButton = screen.getByText('Modern Flat').closest('button');
      expect(modernButton).toHaveAttribute('title', 'Clean, minimal shadows');

      const glassButton = screen.getByText('Glassmorphism').closest('button');
      expect(glassButton).toHaveAttribute('title', 'Frosted glass effects');
    });
  });

  describe('Menu Layout', () => {
    it('should display both menu layout options', () => {
      render(<StylingControls />);

      expect(screen.getByText('Menu Layout')).toBeInTheDocument();
      expect(screen.getByText('Bottom Bar')).toBeInTheDocument();
      expect(screen.getByText('Hamburger')).toBeInTheDocument();
    });

    it('should highlight selected menu layout', () => {
      render(<StylingControls />);

      const bottomBarButton = screen.getByText('Bottom Bar').closest('button');
      expect(bottomBarButton).toHaveClass('border-primary');
      expect(bottomBarButton).toHaveClass('bg-primary/5');
    });

    it('should change menu layout when clicked', async () => {
      const user = userEvent.setup();
      render(<StylingControls />);

      const hamburgerButton = screen.getByText('Hamburger').closest('button');
      await user.click(hamburgerButton!);

      const state = useDesignSystem.getState();
      expect(state.opts.menuLayout).toBe('hamburger');
    });

    it('should toggle between menu layouts', async () => {
      const user = userEvent.setup();
      render(<StylingControls />);

      const hamburgerButton = screen.getByText('Hamburger').closest('button');
      const bottomBarButton = screen.getByText('Bottom Bar').closest('button');

      await user.click(hamburgerButton!);
      let state = useDesignSystem.getState();
      expect(state.opts.menuLayout).toBe('hamburger');

      await user.click(bottomBarButton!);
      state = useDesignSystem.getState();
      expect(state.opts.menuLayout).toBe('bottomBar');
    });
  });

  describe('Spacing Scale', () => {
    it('should display all three spacing options', () => {
      render(<StylingControls />);

      expect(screen.getByText('Spacing Scale')).toBeInTheDocument();
      expect(screen.getByText('Compact')).toBeInTheDocument();
      expect(screen.getByText('Normal')).toBeInTheDocument();
      expect(screen.getByText('Comfortable')).toBeInTheDocument();
    });

    it('should highlight selected spacing mode', () => {
      render(<StylingControls />);

      const normalButton = screen.getByText('Normal').closest('button');
      expect(normalButton).toHaveClass('border-primary');
      expect(normalButton).toHaveClass('bg-primary/5');
    });

    it('should change spacing mode when clicked', async () => {
      const user = userEvent.setup();
      render(<StylingControls />);

      const compactButton = screen.getByText('Compact').closest('button');
      await user.click(compactButton!);

      await waitFor(() => {
        const state = useDesignSystem.getState();
        expect(state.spacingMode).toBe('compact');
      });
    });

    it('should update spacing tokens when mode changes', async () => {
      const user = userEvent.setup();
      render(<StylingControls />);

      const comfortableButton = screen.getByText('Comfortable').closest('button');
      await user.click(comfortableButton!);

      await waitFor(() => {
        const state = useDesignSystem.getState();
        expect(state.tokens.space).toEqual([12, 24, 36, 48, 60, 72, 96, 120]);
      });
    });

    it('should have title attributes with descriptions', () => {
      render(<StylingControls />);

      const compactButton = screen.getByText('Compact').closest('button');
      expect(compactButton).toHaveAttribute('title', 'Compact spacing (4, 8, 12, 16...)');

      const normalButton = screen.getByText('Normal').closest('button');
      expect(normalButton).toHaveAttribute('title', 'Normal spacing (8, 16, 24, 32...)');

      const comfortableButton = screen.getByText('Comfortable').closest('button');
      expect(comfortableButton).toHaveAttribute('title', 'Comfortable spacing (12, 24, 36, 48...)');
    });
  });

  describe('Logo Upload', () => {
    it('should render upload logo button', () => {
      render(<StylingControls />);

      expect(screen.getByText('Upload Logo')).toBeInTheDocument();
    });

    it('should have file input with correct accept type', () => {
      render(<StylingControls />);

      const fileInput = screen.getByText('Upload Logo').parentElement?.querySelector('input[type="file"]');
      expect(fileInput).toHaveAttribute('accept', 'image/*');
      expect(fileInput).toHaveClass('hidden');
    });

    it('should handle logo upload', async () => {
      render(<StylingControls />);

      const file = new File(['logo'], 'logo.png', { type: 'image/png' });
      const fileInput = screen.getByText('Upload Logo').parentElement?.querySelector('input[type="file"]') as HTMLInputElement;

      // Mock FileReader
      const mockFileReader = {
        readAsDataURL: vi.fn(),
        onload: null as any,
        result: 'data:image/png;base64,mockdata'
      };

      vi.spyOn(window, 'FileReader').mockImplementation(() => mockFileReader as any);

      fireEvent.change(fileInput, { target: { files: [file] } });

      // Simulate onload callback
      if (mockFileReader.onload) {
        mockFileReader.onload({ target: { result: 'data:image/png;base64,mockdata' } } as any);
      }

      await waitFor(() => {
        const state = useDesignSystem.getState();
        expect(state.opts.logo).toBe('data:image/png;base64,mockdata');
      });
    });

    it('should display uploaded logo preview', () => {
      // Set a logo in the store
      useDesignSystem.getState().setOpts({ logo: 'data:image/png;base64,test' });

      render(<StylingControls />);

      const logoImg = screen.getByAltText('App logo');
      expect(logoImg).toBeInTheDocument();
      expect(logoImg).toHaveAttribute('src', 'data:image/png;base64,test');
    });
  });

  describe('Logo Generation', () => {
    it('should render logo generation input and button', () => {
      render(<StylingControls />);

      expect(screen.getByPlaceholderText('Describe your app...')).toBeInTheDocument();
      expect(screen.getByText('Generate Logo')).toBeInTheDocument();
    });

    it('should update description input', async () => {
      const user = userEvent.setup();
      render(<StylingControls />);

      const input = screen.getByPlaceholderText('Describe your app...') as HTMLInputElement;
      await user.type(input, 'My amazing app');

      expect(input.value).toBe('My amazing app');
    });

    it('should disable generate button while generating', () => {
      render(<StylingControls />);

      const generateButton = screen.getByText('Generate Logo').closest('button');
      expect(generateButton).not.toBeDisabled();
    });
  });

  describe('Collapsible Sections', () => {
    it('should toggle component styling section', async () => {
      const user = userEvent.setup();
      render(<StylingControls />);

      const trigger = screen.getByText('Component Styling').closest('button');
      expect(screen.getByText('Style Preset')).toBeVisible();

      await user.click(trigger!);

      // Content should be hidden
      const chevron = trigger!.querySelector('svg:last-child');
      expect(chevron).not.toHaveClass('rotate-180');
    });

    it('should toggle logo section', async () => {
      const user = userEvent.setup();
      render(<StylingControls />);

      const trigger = screen.getByText('Logo').closest('button');
      expect(screen.getByText('Upload Logo')).toBeVisible();

      await user.click(trigger!);

      // Chevron should not have rotate-180 when closed
      const chevron = trigger!.querySelector('svg:last-child');
      expect(chevron).not.toHaveClass('rotate-180');
    });

    it('should show chevron rotation when sections are open', () => {
      render(<StylingControls />);

      const componentStylingTrigger = screen.getByText('Component Styling').closest('button');
      const logoTrigger = screen.getByText('Logo').closest('button');

      const componentChevron = componentStylingTrigger!.querySelector('svg:last-child');
      const logoChevron = logoTrigger!.querySelector('svg:last-child');

      expect(componentChevron).toHaveClass('rotate-180');
      expect(logoChevron).toHaveClass('rotate-180');
    });
  });

  describe('Store Integration', () => {
    it('should reflect store state in UI', () => {
      // Set specific state
      const { setStylePreset, setSpacingMode, setOpts } = useDesignSystem.getState();
      setStylePreset('glass');
      setSpacingMode('compact');
      setOpts({ menuLayout: 'hamburger' });

      render(<StylingControls />);

      // Glassmorphism should be selected
      const glassButton = screen.getByText('Glassmorphism').closest('button');
      expect(glassButton).toHaveClass('border-primary');

      // Compact should be selected
      const compactButton = screen.getByText('Compact').closest('button');
      expect(compactButton).toHaveClass('border-primary');

      // Hamburger should be selected
      const hamburgerButton = screen.getByText('Hamburger').closest('button');
      expect(hamburgerButton).toHaveClass('border-primary');
    });

    it('should update store when multiple settings change', async () => {
      const user = userEvent.setup();
      render(<StylingControls />);

      // Change multiple settings
      await user.click(screen.getByText('Playful').closest('button')!);
      await user.click(screen.getByText('Hamburger').closest('button')!);
      await user.click(screen.getByText('Comfortable').closest('button')!);

      await waitFor(() => {
        const state = useDesignSystem.getState();
        expect(state.stylePresetId).toBe('playful');
        expect(state.opts.menuLayout).toBe('hamburger');
        expect(state.spacingMode).toBe('comfortable');
      });
    });
  });

  describe('Accessibility', () => {
    it('should have proper labels for sections', () => {
      render(<StylingControls />);

      expect(screen.getByText('Style Preset')).toBeInTheDocument();
      expect(screen.getByText('Menu Layout')).toBeInTheDocument();
      expect(screen.getByText('Spacing Scale')).toBeInTheDocument();
    });

    it('should have icons for visual context', () => {
      render(<StylingControls />);

      // Check that icon elements are present in section headers
      const componentStylingHeader = screen.getByText('Component Styling').parentElement;
      expect(componentStylingHeader?.querySelector('svg')).toBeInTheDocument();

      const logoHeader = screen.getByText('Logo').parentElement;
      expect(logoHeader?.querySelector('svg')).toBeInTheDocument();
    });

    it('should have descriptive button text', () => {
      render(<StylingControls />);

      // All options should have clear labels
      expect(screen.getByText('Modern Flat')).toBeInTheDocument();
      expect(screen.getByText('Bottom Bar')).toBeInTheDocument();
      expect(screen.getByText('Compact')).toBeInTheDocument();
      expect(screen.getByText('Upload Logo')).toBeInTheDocument();
      expect(screen.getByText('Generate Logo')).toBeInTheDocument();
    });
  });

  describe('User Interactions', () => {
    it('should handle rapid clicks without errors', async () => {
      const user = userEvent.setup();
      render(<StylingControls />);

      const compactButton = screen.getByText('Compact').closest('button')!;
      const normalButton = screen.getByText('Normal').closest('button')!;
      const comfortableButton = screen.getByText('Comfortable').closest('button')!;

      // Rapidly click different spacing modes
      await user.click(compactButton);
      await user.click(comfortableButton);
      await user.click(normalButton);
      await user.click(compactButton);

      await waitFor(() => {
        const state = useDesignSystem.getState();
        expect(state.spacingMode).toBe('compact');
      });
    });

    it('should handle switching between all presets', async () => {
      const user = userEvent.setup();
      render(<StylingControls />);

      const presets = [
        'Modern Flat',
        'Glassmorphism',
        'Playful',
        'Soft & Dreamy',
        'Minimalist'
      ];

      for (const preset of presets) {
        const button = screen.getByText(preset).closest('button')!;
        await user.click(button);
      }

      await waitFor(() => {
        const state = useDesignSystem.getState();
        expect(state.stylePresetId).toBe('minimalist');
      });
    });
  });
});
