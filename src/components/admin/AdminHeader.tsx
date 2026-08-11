export function AdminHeader({ name }: { name: string }) {
  return (
    <header className="flex items-center justify-end border-b border-sand-deep bg-white px-8 py-4">
      <div className="text-right">
        <p className="text-sm font-medium text-charcoal">{name}</p>
        <p className="text-xs text-charcoal/50">Admin</p>
      </div>
    </header>
  );
}
