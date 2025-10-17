import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Sidebar } from '@/components/Sidebar';
import { useDesignSystem } from '@/state/designSystem';

describe('Sidebar Component', () => {
  beforeEach(async () => {
    // Reset store to defaults before each test
    const { setDarkMode, setTheme, setAccentColor, setScale, setFont, setCustomPrimaryColor, setCustomAccentColor } =
      useDesignSystem.getState();

    setDarkMode(false);
    setTheme('turquoise');
    setAccentColor('turquoise');
    setScale('regular');
    setFont('font-jakarta');
    setCustomPrimaryColor('#3498db');
    setCustomAccentColor('#1abc9c');

    await new Promise(resolve => setTimeout(resolve, 0));
  });

  describe('Rendering', () => {
    it('should render the sidebar with title and description', () => {
      render(<Sidebar />);

      expect(screen.getByText('Design System Builder')).toBeInTheDocument();
      expect(screen.getByText(/Customize your design system/i)).toBeInTheDocument();
    });

    it('should render typography section', () => {
      render(<Sidebar />);

      expect(screen.getByText('Typography')).toBeInTheDocument();
    });

    it('should render colors section', () => {
      render(<Sidebar />);

      expect(screen.getByText('Colors')).toBeInTheDocument();
    });

    it('should render settings button', () => {
      render(<Sidebar />);

      expect(screen.getByRole('button', { name: /settings/i })).toBeInTheDocument();
    });
  });

  describe('Typography Controls', () => {
    it('should display current font family', () => {
      render(<Sidebar />);

      // Default font should be Plus Jakarta Sans
      expect(screen.getByText('Plus Jakarta Sans')).toBeInTheDocument();
    });

    it('should allow changing font family', async () => {
      const user = userEvent.setup();
      render(<Sidebar />);

      // Click the font dropdown
      const fontButton = screen.getByRole('button', { name: /plus jakarta sans/i });
      await user.click(fontButton);

      // Select a different font
      const vietnamOption = screen.getByRole('menuitem', { name: /be vietnam pro/i });
      await user.click(vietnamOption);

      // Verify state updated
      const state = useDesignSystem.getState();
      expect(state.selectedFont).toBe('font-vietnam');
    });

    it('should display all three type scale buttons', () => {
      render(<Sidebar />);

      const scaleButtons = screen.getAllByTitle(/scale/i);
      expect(scaleButtons).toHaveLength(3);
      expect(screen.getByTitle('Small Scale')).toBeInTheDocument();
      expect(screen.getByTitle('Regular Scale')).toBeInTheDocument();
      expect(screen.getByTitle('Large Scale')).toBeInTheDocument();
    });

    it('should highlight the selected type scale', () => {
      render(<Sidebar />);

      const regularButton = screen.getByTitle('Regular Scale');
      expect(regularButton).toHaveClass('border-primary');
    });

    it('should change type scale when button clicked', async () => {
      const user = userEvent.setup();
      render(<Sidebar />);

      const smallButton = screen.getByTitle('Small Scale');
      await user.click(smallButton);

      const state = useDesignSystem.getState();
      expect(state.selectedScale).toBe('small');
    });
  });

  describe('Color Controls', () => {
    it('should display primary color picker grid', () => {
      render(<Sidebar />);

      const primaryColorLabel = screen.getByText('Primary Color');
      expect(primaryColorLabel).toBeInTheDocument();

      // Should have color buttons (18 themes including custom)
      const colorSection = primaryColorLabel.nextElementSibling;
      const colorButtons = colorSection?.querySelectorAll('button, input[type="color"]');
      expect(colorButtons?.length).toBeGreaterThan(0);
    });

    it('should display accent color picker grid', () => {
      render(<Sidebar />);

      const accentColorLabel = screen.getByText('Accent Color');
      expect(accentColorLabel).toBeInTheDocument();
    });

    it('should change primary color when theme button clicked', async () => {
      const user = userEvent.setup();
      render(<Sidebar />);

      // Find and click emerald color button (there are two - primary and accent)
      const emeraldButtons = screen.getAllByTitle('Emerald');
      await user.click(emeraldButtons[0]); // First one is primary

      const state = useDesignSystem.getState();
      expect(state.selectedTheme).toBe('emerald');
    });

    it('should change accent color when clicked', async () => {
      const user = userEvent.setup();
      render(<Sidebar />);

      // Find accent color buttons by looking for the second occurrence of each color
      const accentSection = screen.getByText('Accent Color').nextElementSibling;
      const amethystButton = within(accentSection as HTMLElement).getByTitle('Amethyst');

      await user.click(amethystButton);

      const state = useDesignSystem.getState();
      expect(state.selectedAccentColor).toBe('amethyst');
    });

    it('should highlight selected primary color', () => {
      render(<Sidebar />);

      // Default is turquoise
      const turquoiseButtons = screen.getAllByTitle('Turquoise');
      // First one is primary color
      expect(turquoiseButtons[0]).toHaveClass('border-2');
      expect(turquoiseButtons[0]).toHaveClass('border-foreground');
    });

    it('should support custom primary color', async () => {
      const user = userEvent.setup();
      render(<Sidebar />);

      // Find custom color section - there are two "Custom" elements (input and div) for primary color
      const primarySection = screen.getByText('Primary Color').nextElementSibling;
      const customElements = within(primarySection as HTMLElement).getAllByTitle('Custom');

      // Click the visible div (second element, first is the hidden input)
      fireEvent.click(customElements[1]);

      const state = useDesignSystem.getState();
      expect(state.selectedTheme).toBe('custom');
    });
  });

  describe('Dark Mode Toggle', () => {
    it('should render dark mode switch', () => {
      render(<Sidebar />);

      const darkModeLabel = screen.getByText('Dark Mode');
      expect(darkModeLabel).toBeInTheDocument();

      // Switch should be present
      const switchElement = darkModeLabel.parentElement?.querySelector('[role="switch"]');
      expect(switchElement).toBeInTheDocument();
    });

    it('should toggle dark mode when switch clicked', async () => {
      const user = userEvent.setup();
      render(<Sidebar />);

      const darkModeSwitch = screen.getByRole('switch');
      expect(darkModeSwitch).toHaveAttribute('aria-checked', 'false');

      await user.click(darkModeSwitch);

      const state = useDesignSystem.getState();
      expect(state.isDarkMode).toBe(true);
    });

    it('should reflect dark mode state in switch', () => {
      // Set dark mode to true
      useDesignSystem.getState().setDarkMode(true);

      render(<Sidebar />);

      const darkModeSwitch = screen.getByRole('switch');
      expect(darkModeSwitch).toHaveAttribute('aria-checked', 'true');
    });
  });

  describe('Collapsible Sections', () => {
    it('should start with typography section open by default', () => {
      render(<Sidebar />);

      // Font Family label should be visible
      expect(screen.getByText('Font Family')).toBeInTheDocument();
      expect(screen.getByText('Type Scale')).toBeInTheDocument();
    });

    it('should start with colors section open by default', () => {
      render(<Sidebar />);

      expect(screen.getByText('Primary Color')).toBeInTheDocument();
      expect(screen.getByText('Accent Color')).toBeInTheDocument();
    });

    it('should toggle typography section when header clicked', async () => {
      const user = userEvent.setup();
      render(<Sidebar />);

      const typographyTrigger = screen.getByText('Typography').closest('button');
      expect(typographyTrigger).toBeInTheDocument();

      // Section should be open initially
      expect(screen.getByText('Font Family')).toBeVisible();

      // Click to close
      await user.click(typographyTrigger!);

      // Content should be hidden (though the element may still be in DOM)
      // The chevron should rotate
      const chevron = typographyTrigger!.querySelector('svg');
      expect(chevron).not.toHaveClass('rotate-180');
    });

    it('should toggle colors section when header clicked', async () => {
      const user = userEvent.setup();
      render(<Sidebar />);

      const colorsTrigger = screen.getByText('Colors').closest('button');
      expect(colorsTrigger).toBeInTheDocument();

      // Click to collapse
      await user.click(colorsTrigger!);

      // Chevron should not have rotate-180 class when closed
      const chevron = colorsTrigger!.querySelector('svg');
      expect(chevron).not.toHaveClass('rotate-180');
    });
  });

  describe('Store Integration', () => {
    it('should use store directly without props', () => {
      render(<Sidebar />);

      // Sidebar should work without any props
      expect(screen.getByText('Design System Builder')).toBeInTheDocument();
    });

    it('should reflect store state in UI', () => {
      // Set specific state
      const { setFont, setScale, setTheme } = useDesignSystem.getState();
      setFont('font-satoshi');
      setScale('large');
      setTheme('amethyst');

      render(<Sidebar />);

      // Font should be displayed
      expect(screen.getByText('Satoshi')).toBeInTheDocument();

      // Large scale should be selected
      const largeButton = screen.getByTitle('Large Scale');
      expect(largeButton).toHaveClass('border-primary');

      // Amethyst should be selected
      const amethystButton = screen.getAllByTitle('Amethyst')[0]; // Primary color
      expect(amethystButton).toHaveClass('border-2');
    });

    it('should update store when user interacts', async () => {
      const user = userEvent.setup();
      render(<Sidebar />);

      // Change multiple settings
      await user.click(screen.getByTitle('Small Scale'));
      const emeraldButtons = screen.getAllByTitle('Emerald');
      await user.click(emeraldButtons[0]); // Primary color

      const state = useDesignSystem.getState();
      expect(state.selectedScale).toBe('small');
      expect(state.selectedTheme).toBe('emerald');
    });
  });

  describe('Accessibility', () => {
    it('should have proper labels for form controls', () => {
      render(<Sidebar />);

      expect(screen.getByText('Font Family')).toBeInTheDocument();
      expect(screen.getByText('Type Scale')).toBeInTheDocument();
      expect(screen.getByText('Primary Color')).toBeInTheDocument();
      expect(screen.getByText('Accent Color')).toBeInTheDocument();
      expect(screen.getByText('Dark Mode')).toBeInTheDocument();
    });

    it('should have title attributes on color buttons', () => {
      render(<Sidebar />);

      // Check a few color buttons have titles
      expect(screen.getAllByTitle('Turquoise')[0]).toBeInTheDocument();
      expect(screen.getAllByTitle('Emerald')[0]).toBeInTheDocument();
      expect(screen.getAllByTitle('Amethyst')[0]).toBeInTheDocument();
    });

    it('should have title attributes on scale buttons', () => {
      render(<Sidebar />);

      expect(screen.getByTitle('Small Scale')).toBeInTheDocument();
      expect(screen.getByTitle('Regular Scale')).toBeInTheDocument();
      expect(screen.getByTitle('Large Scale')).toBeInTheDocument();
    });
  });

  describe('User Interactions', () => {
    it('should handle multiple rapid clicks without errors', async () => {
      const user = userEvent.setup();
      render(<Sidebar />);

      const smallButton = screen.getByTitle('Small Scale');
      const regularButton = screen.getByTitle('Regular Scale');
      const largeButton = screen.getByTitle('Large Scale');

      // Rapidly click different scales
      await user.click(smallButton);
      await user.click(largeButton);
      await user.click(regularButton);
      await user.click(smallButton);

      const state = useDesignSystem.getState();
      expect(state.selectedScale).toBe('small');
    });

    it('should handle font dropdown interactions', async () => {
      const user = userEvent.setup();
      render(<Sidebar />);

      // Open dropdown
      const fontButton = screen.getByRole('button', { name: /plus jakarta sans/i });
      await user.click(fontButton);

      // Should show all 6 fonts
      expect(screen.getByRole('menuitem', { name: /plus jakarta sans/i })).toBeInTheDocument();
      expect(screen.getByRole('menuitem', { name: /be vietnam pro/i })).toBeInTheDocument();
      expect(screen.getByRole('menuitem', { name: /wix madefor text/i })).toBeInTheDocument();
      expect(screen.getByRole('menuitem', { name: /figtree/i })).toBeInTheDocument();
      expect(screen.getByRole('menuitem', { name: /albert sans/i })).toBeInTheDocument();
      expect(screen.getByRole('menuitem', { name: /satoshi/i })).toBeInTheDocument();
    });
  });
});
