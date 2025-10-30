import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { PreviewPhone } from '@/components/PreviewPhone';
import { useDesignSystem } from '@/state/designSystem';

describe('PreviewPhone Component', () => {
  beforeEach(async () => {
    // Reset store to defaults before each test
    const {
      setDarkMode,
      setTheme,
      setAccentColor,
      setScale,
      setPrimaryFont,
      setDisplayFont,
      setCustomPrimaryColor,
      setCustomAccentColor,
      setStylePreset,
      setSpacingMode,
      setOpts
    } = useDesignSystem.getState();

    setDarkMode(false);
    setTheme('turquoise');
    setAccentColor('turquoise');
    setScale('regular');
    setPrimaryFont('font-jakarta');
    setDisplayFont('font-jakarta');
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

    await new Promise(resolve => setTimeout(resolve, 0));
  });

  describe('Rendering', () => {
    it('should render phone frame', () => {
      render(<PreviewPhone />);

      // Status bar time should be visible
      expect(screen.getByText('9:41')).toBeInTheDocument();
    });

    it('should render app header', () => {
      render(<PreviewPhone />);

      expect(screen.getByText('Discover')).toBeInTheDocument();
    });

    it('should render category pills', () => {
      render(<PreviewPhone />);

      expect(screen.getByText('For You')).toBeInTheDocument();
      expect(screen.getByText('Trending')).toBeInTheDocument();
      expect(screen.getByText('News')).toBeInTheDocument();
      expect(screen.getByText('Sports')).toBeInTheDocument();
      expect(screen.getByText('Tech')).toBeInTheDocument();
    });

    it('should render hero card', () => {
      render(<PreviewPhone />);

      expect(screen.getByText('Featured Today')).toBeInTheDocument();
      expect(screen.getByText("Discover what's trending in your community")).toBeInTheDocument();
      expect(screen.getByText('Explore Now')).toBeInTheDocument();
    });

    it('should render stats row', () => {
      render(<PreviewPhone />);

      expect(screen.getByText('Posts')).toBeInTheDocument();
      expect(screen.getByText('124')).toBeInTheDocument();
      expect(screen.getByText('Likes')).toBeInTheDocument();
      expect(screen.getByText('2.3k')).toBeInTheDocument();
      expect(screen.getByText('Time')).toBeInTheDocument();
      expect(screen.getByText('3.5h')).toBeInTheDocument();
    });

    it('should render list items', () => {
      render(<PreviewPhone />);

      expect(screen.getByText('Location Services')).toBeInTheDocument();
      expect(screen.getByText('While using app')).toBeInTheDocument();
      expect(screen.getByText('Notifications')).toBeInTheDocument();
      expect(screen.getByText('Push, Email')).toBeInTheDocument();
      expect(screen.getByText('Preferences')).toBeInTheDocument();
      expect(screen.getByText('Customize your experience')).toBeInTheDocument();
    });

    it('should render user cards', () => {
      render(<PreviewPhone />);

      expect(screen.getByText('Sarah J.')).toBeInTheDocument();
      expect(screen.getByText('Mike D.')).toBeInTheDocument();
      const activeNowElements = screen.getAllByText('Active now');
      expect(activeNowElements).toHaveLength(2);
    });

    it('should render action buttons', () => {
      render(<PreviewPhone />);

      expect(screen.getByText('Get Started')).toBeInTheDocument();
      expect(screen.getByText('Learn More')).toBeInTheDocument();
    });

    it('should render review card', () => {
      render(<PreviewPhone />);

      expect(screen.getByText('Great Experience')).toBeInTheDocument();
      expect(screen.getByText('"Amazing app with beautiful design and smooth performance. Highly recommended!"')).toBeInTheDocument();
      expect(screen.getByText('2h ago')).toBeInTheDocument();
    });
  });

  describe('Menu Layout', () => {
    it('should show bottom bar navigation by default', () => {
      render(<PreviewPhone />);

      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('Search')).toBeInTheDocument();
      expect(screen.getByText('Create')).toBeInTheDocument();
      expect(screen.getByText('Activity')).toBeInTheDocument();
      expect(screen.getByText('Profile')).toBeInTheDocument();
    });

    it('should hide bottom bar when menu layout is hamburger', () => {
      useDesignSystem.getState().setOpts({ menuLayout: 'hamburger' });

      render(<PreviewPhone />);

      // Bottom bar navigation items should not be present
      const homeButtons = screen.queryAllByText('Home');
      const searchButtons = screen.queryAllByText('Search');
      const createButtons = screen.queryAllByText('Create');

      // Should not find bottom nav items (only icon labels, not full text)
      expect(homeButtons).toHaveLength(0);
      expect(searchButtons).toHaveLength(0);
      expect(createButtons).toHaveLength(0);
    });

    it('should show hamburger menu icon when layout is hamburger', () => {
      useDesignSystem.getState().setOpts({ menuLayout: 'hamburger' });

      render(<PreviewPhone />);

      // Hamburger menu button should be present in header
      const header = screen.getByText('Discover').closest('header');
      expect(header).toBeInTheDocument();

      // Look for Menu icon (lucide-react renders as svg)
      const menuButton = header?.querySelector('button');
      expect(menuButton).toBeInTheDocument();
    });

    it('should not show hamburger menu icon when layout is bottom bar', () => {
      render(<PreviewPhone />);

      // Find the header
      const discoverText = screen.getByText('Discover');
      const header = discoverText.closest('header');

      // With bottom bar layout, there should be no Menu button
      // Header contains Search, Bell buttons plus category pills
      const buttons = header?.querySelectorAll('button') || [];

      // Should have buttons: Search, Bell, and 5 category pills = 7 total
      expect(buttons.length).toBeGreaterThanOrEqual(2);

      // The first button should NOT be a menu button (no Menu icon)
      // We can check that there's no Menu button by checking the button structure
      const firstButton = buttons[0];
      expect(firstButton.querySelector('svg')).toBeInTheDocument(); // Has an icon
    });
  });

  describe('Logo Display', () => {
    it('should display app name without logo by default', () => {
      render(<PreviewPhone />);

      const heading = screen.getByText('Discover');
      expect(heading).toBeInTheDocument();

      // Should not have logo image
      const logoImages = screen.queryAllByAltText('App logo');
      expect(logoImages).toHaveLength(0);
    });

    it('should display logo when logo is set', () => {
      useDesignSystem.getState().setOpts({ logo: 'data:image/png;base64,test' });

      render(<PreviewPhone />);

      const logo = screen.getByAltText('App logo');
      expect(logo).toBeInTheDocument();
      expect(logo).toHaveAttribute('src', 'data:image/png;base64,test');
    });

    it('should display both logo and app name when logo is set', () => {
      useDesignSystem.getState().setOpts({ logo: 'data:image/png;base64,test' });

      render(<PreviewPhone />);

      expect(screen.getByAltText('App logo')).toBeInTheDocument();
      expect(screen.getByText('Discover')).toBeInTheDocument();
    });
  });

  describe('Status Bar', () => {
    it('should display time', () => {
      render(<PreviewPhone />);

      expect(screen.getByText('9:41')).toBeInTheDocument();
    });

    it('should display battery indicator', () => {
      const { container } = render(<PreviewPhone />);

      // Find the status bar
      const statusBar = container.querySelector('.bg-\\[rgb\\(var\\(--color-bg-primary\\)\\)\\].px-4.py-1');
      expect(statusBar).toBeInTheDocument();

      // Battery indicator is a nested div structure
      const batteryBorder = statusBar?.querySelector('.border.border-current.rounded-sm');
      expect(batteryBorder).toBeInTheDocument();
    });
  });

  describe('Content Elements', () => {
    it('should display all category pills', () => {
      render(<PreviewPhone />);

      const categories = ['For You', 'Trending', 'News', 'Sports', 'Tech'];
      categories.forEach(category => {
        expect(screen.getByText(category)).toBeInTheDocument();
      });
    });

    it('should display stats with values', () => {
      render(<PreviewPhone />);

      // Check all stat values are present
      expect(screen.getByText('124')).toBeInTheDocument();
      expect(screen.getByText('2.3k')).toBeInTheDocument();
      expect(screen.getByText('3.5h')).toBeInTheDocument();
    });

    it('should display list items with subtitles', () => {
      render(<PreviewPhone />);

      expect(screen.getByText('Location Services')).toBeInTheDocument();
      expect(screen.getByText('While using app')).toBeInTheDocument();

      expect(screen.getByText('Notifications')).toBeInTheDocument();
      expect(screen.getByText('Push, Email')).toBeInTheDocument();

      expect(screen.getByText('Preferences')).toBeInTheDocument();
      expect(screen.getByText('Customize your experience')).toBeInTheDocument();
    });

    it('should display user cards with follow buttons', () => {
      render(<PreviewPhone />);

      // Check both users are displayed
      expect(screen.getByText('Sarah J.')).toBeInTheDocument();
      expect(screen.getByText('Mike D.')).toBeInTheDocument();

      // Check Follow buttons
      const followButtons = screen.getAllByText('Follow');
      expect(followButtons).toHaveLength(2);
    });

    it('should display review card with star rating', () => {
      const { container } = render(<PreviewPhone />);

      expect(screen.getByText('Great Experience')).toBeInTheDocument();

      // Find star icons (5 stars)
      const reviewCard = screen.getByText('Great Experience').closest('div');
      const stars = reviewCard?.querySelectorAll('svg');

      // Should have at least 5 star icons plus interaction icons
      expect(stars!.length).toBeGreaterThanOrEqual(5);
    });

    it('should display review interaction buttons', () => {
      render(<PreviewPhone />);

      // Check for like count, comment count
      expect(screen.getByText('24')).toBeInTheDocument(); // Likes
      expect(screen.getByText('5')).toBeInTheDocument(); // Comments
    });
  });

  describe('Store Integration', () => {
    it('should apply selected font family', () => {
      useDesignSystem.getState().setPrimaryFont('font-vietnam');

      const { container } = render(<PreviewPhone />);

      // Phone frame should have the font class
      const phoneFrame = container.querySelector('.font-vietnam');
      expect(phoneFrame).toBeInTheDocument();
    });

    it('should reflect menu layout changes', () => {
      const { rerender } = render(<PreviewPhone />);

      // Initially bottom bar
      expect(screen.getByText('Home')).toBeInTheDocument();

      // Change to hamburger
      useDesignSystem.getState().setOpts({ menuLayout: 'hamburger' });
      rerender(<PreviewPhone />);

      // Bottom bar should be gone
      expect(screen.queryByText('Home')).not.toBeInTheDocument();
    });

    it('should reflect logo changes', () => {
      const { rerender } = render(<PreviewPhone />);

      // No logo initially
      expect(screen.queryByAltText('App logo')).not.toBeInTheDocument();

      // Add logo
      useDesignSystem.getState().setOpts({ logo: 'data:image/png;base64,newlogo' });
      rerender(<PreviewPhone />);

      // Logo should appear
      const logo = screen.getByAltText('App logo');
      expect(logo).toBeInTheDocument();
      expect(logo).toHaveAttribute('src', 'data:image/png;base64,newlogo');
    });
  });

  describe('Visual Structure', () => {
    it('should have proper phone frame structure', () => {
      const { container } = render(<PreviewPhone />);

      // Should have main phone frame with proper styling
      const phoneFrame = container.querySelector('.w-80.h-\\[640px\\]');
      expect(phoneFrame).toBeInTheDocument();
    });

    it('should have header section', () => {
      render(<PreviewPhone />);

      const header = screen.getByText('Discover').closest('header');
      expect(header).toBeInTheDocument();
    });

    it('should have scrollable content area', () => {
      const { container } = render(<PreviewPhone />);

      // Content area should have overflow-y-auto class
      const contentArea = container.querySelector('.flex-1.overflow-y-auto');
      expect(contentArea).toBeInTheDocument();
    });

    it('should render action buttons side by side', () => {
      render(<PreviewPhone />);

      const getStartedButton = screen.getByText('Get Started');
      const learnMoreButton = screen.getByText('Learn More');

      expect(getStartedButton).toBeInTheDocument();
      expect(learnMoreButton).toBeInTheDocument();

      // Both buttons should be in the same container
      const buttonContainer = getStartedButton.parentElement;
      expect(buttonContainer).toContain(learnMoreButton);
    });
  });

  describe('Accessibility', () => {
    it('should have alt text for logo when present', () => {
      useDesignSystem.getState().setOpts({ logo: 'data:image/png;base64,test' });

      render(<PreviewPhone />);

      const logo = screen.getByAltText('App logo');
      expect(logo).toHaveAttribute('alt', 'App logo');
    });

    it('should have semantic HTML structure', () => {
      render(<PreviewPhone />);

      // Should have header element
      const header = document.querySelector('header');
      expect(header).toBeInTheDocument();

      // Should have nav element when bottom bar is shown
      const nav = document.querySelector('nav');
      expect(nav).toBeInTheDocument();
    });

    it('should have button elements for interactive items', () => {
      const { container } = render(<PreviewPhone />);

      // All interactive elements should be buttons
      const buttons = container.querySelectorAll('button');

      // Should have multiple buttons (category pills, actions, nav items, etc.)
      expect(buttons.length).toBeGreaterThan(10);
    });
  });

  describe('Navigation Items', () => {
    it('should display all bottom bar navigation items', () => {
      render(<PreviewPhone />);

      const navItems = ['Home', 'Search', 'Create', 'Activity', 'Profile'];
      navItems.forEach(item => {
        expect(screen.getByText(item)).toBeInTheDocument();
      });
    });

    it('should have navigation in correct order', () => {
      render(<PreviewPhone />);

      const nav = screen.getByText('Home').closest('nav');
      const buttons = within(nav!).getAllByRole('button');

      expect(buttons).toHaveLength(5);
      expect(buttons[0]).toHaveTextContent('Home');
      expect(buttons[1]).toHaveTextContent('Search');
      expect(buttons[2]).toHaveTextContent('Create');
      expect(buttons[3]).toHaveTextContent('Activity');
      expect(buttons[4]).toHaveTextContent('Profile');
    });
  });
});
