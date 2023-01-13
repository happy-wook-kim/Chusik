import { Link } from "@remix-run/react";

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Welcome to Remix</h1>

      <Link prefetch="intent" to="/restaurant">음식점</Link>
      <Link prefetch="intent" to="/restaurant/detail">음식점 상세</Link>
    </div>
  );
}
