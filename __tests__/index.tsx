export default function FizzBuzz({ count }: { count: number }) {
  const items: string[] = [];

  for (let i = 1; i <= count; i++) {
    if (i % 15 === 0) {
      items.push('FizzBuzz');
    } else if (i % 3 === 0) {
      items.push('Fizz');
    } else if (i % 5 === 0) {
      items.push('Buzz');
    } else {
      items.push(String(i));
    }
  }

  return <div>{items.join(', ')}</div>;
}
