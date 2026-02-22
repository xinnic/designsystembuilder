// ─── Composed Components (Phase 1D) ────────────────────────────────────────
// These compose core UI primitives into real B2C app patterns.

export {
  BottomNav,
  bottomNavContainerVariants,
  bottomNavItemVariants,
  bottomNavIconVariants,
  bottomNavLabelVariants,
} from './BottomNav';
export type { BottomNavProps, BottomNavItem } from './BottomNav';

export { AppBar, AppBarAction, appBarVariants } from './AppBar';
export type { AppBarProps, AppBarActionProps } from './AppBar';

export { CategoryPills } from './CategoryPills';
export type { CategoryPillsProps, CategoryItem } from './CategoryPills';

export { FeedCard, feedCardVariants } from './FeedCard';
export type { FeedCardProps } from './FeedCard';

export { ProfileCard, profileCardVariants } from './ProfileCard';
export type { ProfileCardProps, ProfileStat } from './ProfileCard';

export { ReviewCard, StarRating } from './ReviewCard';
export type { ReviewCardProps } from './ReviewCard';

export { SettingsGroup } from './SettingsGroup';
export type { SettingsGroupProps, SettingsItem } from './SettingsGroup';

export { StatsCard, statsCardVariants } from './StatsCard';
export type { StatsCardProps } from './StatsCard';

export { UserCard, userCardVariants } from './UserCard';
export type { UserCardProps } from './UserCard';
