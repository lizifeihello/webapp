export default function App() {
  const testApi = async () => {
    try {
      const res = await fetch("/health");
      console.log(await res.json());
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <button onClick={testApi}>Test button</button>
    </div>
  );
}