import { styled, Progress as TamaguiProgress, GetProps } from 'tamagui';

/**
 * Progress - Styled progress bar component with design tokens
 *
 * Features:
 * - Brand color fills
 * - Animated progress
 * - Multiple sizes
 * - Semantic color variants
 *
 * @example
 * <Progress value={60} max={100}>
 *   <Progress.Indicator />
 * </Progress>
 *
 * <Progress value={30} variant="success">
 *   <Progress.Indicator animated />
 * </Progress>
 */
export const Progress = styled(TamaguiProgress, {
  name: 'Progress',
  width: '100%',
  height: 8,
  backgroundColor: '$bgSecondary',
  borderRadius: '$4',
  overflow: 'hidden',
  borderWidth: 1,
  borderColor: '$border',

  variants: {
    size: {
      small: {
        height: 4,
      },
      medium: {
        height: 8,
      },
      large: {
        height: 12,
      },
    },

    variant: {
      default: {},
      bordered: {
        borderWidth: 2,
        borderColor: '$border',
      },
      flat: {
        borderWidth: 0,
        backgroundColor: '$bgSecondary',
      },
    },
  },

  defaultVariants: {
    size: 'medium',
    variant: 'default',
  },
});

// Styled progress indicator
export const ProgressIndicator = styled(TamaguiProgress.Indicator, {
  name: 'ProgressIndicator',
  height: '100%',
  backgroundColor: '$brand',
  borderRadius: '$4',
  transition: 'all 0.3s ease',

  variants: {
    variant: {
      default: {
        backgroundColor: '$brand',
      },
      success: {
        backgroundColor: '$success',
      },
      warning: {
        backgroundColor: '$warning',
      },
      danger: {
        backgroundColor: '$danger',
      },
      info: {
        backgroundColor: '$info',
      },
      gradient: {
        background: 'linear-gradient(90deg, $brand 0%, $brandWeak 100%)',
      },
    },

    animated: {
      true: {
        animation: 'quick',
        animateOnly: ['width'],
      },
    },

    striped: {
      true: {
        backgroundImage: `linear-gradient(
          45deg,
          rgba(255,255,255,0.15) 25%,
          transparent 25%,
          transparent 50%,
          rgba(255,255,255,0.15) 50%,
          rgba(255,255,255,0.15) 75%,
          transparent 75%,
          transparent
        )`,
        backgroundSize: '20px 20px',
        animation: 'stripes 1s linear infinite',
      },
    },
  },

  defaultVariants: {
    variant: 'default',
  },
});

// Re-export for convenience
Progress.Indicator = ProgressIndicator;

// Circular progress component
export const CircularProgress = styled(TamaguiProgress, {
  name: 'CircularProgress',
  width: 48,
  height: 48,
  borderRadius: '$4',
  backgroundColor: 'transparent',
  alignItems: 'center',
  justifyContent: 'center',

  variants: {
    size: {
      small: {
        width: 32,
        height: 32,
      },
      medium: {
        width: 48,
        height: 48,
      },
      large: {
        width: 64,
        height: 64,
      },
    },

    variant: {
      default: {},
      spinning: {
        animation: 'spin 1s linear infinite',
      },
    },
  },

  defaultVariants: {
    size: 'medium',
    variant: 'default',
  },
});

// Convenience wrapper for progress with label
export const ProgressWithLabel = ({ value, label, ...props }: any) => {
  return (
    <div style={{ width: '100%' }}>
      {label && (
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '8px'
        }}>
          <span>{label}</span>
          <span>{value}%</span>
        </div>
      )}
      <Progress value={value} {...props}>
        <ProgressIndicator />
      </Progress>
    </div>
  );
};

export type ProgressProps = GetProps<typeof Progress>;