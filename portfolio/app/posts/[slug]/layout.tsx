type Props = {
  children: React.ReactNode;
};

export default function PostDetailLayout({ children }: Props) {
  return <div className="px-4 ">{children}</div>;
}
