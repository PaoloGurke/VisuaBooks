// WalletPage.tsx
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import type { Book } from '@shared/schema';

interface WalletPageProps {
  balance: number;
  setBalance: React.Dispatch<React.SetStateAction<number>>;
  lockedBooks: { id: string; title: string; price: number }[];
}

export default function WalletPage({ balance, setBalance, lockedBooks }: WalletPageProps) {
  const [deposit, setDeposit] = useState(0);

  const handleDeposit = () => {
    if (deposit > 0) {
      setBalance(balance + deposit);
      setDeposit(0);
    }
  };

  return (
    <div className="min-h-screen bg-background px-4 py-8 max-w-5xl mx-auto">
      <h1 className="font-serif text-3xl font-bold mb-4">Wallet</h1>
      <p className="text-lg mb-6">Current Balance: <strong>${balance}</strong></p>

      <div className="flex gap-2 mb-8">
        <input
          type="number"
          value={deposit}
          onChange={(e) => setDeposit(Number(e.target.value))}
          placeholder="Enter deposit amount"
          className="border border-border rounded px-3 py-2 w-40"
        />
        <Button onClick={handleDeposit}>Deposit</Button>
      </div>

      <h2 className="font-serif text-2xl font-semibold mb-4">Locked Books</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {lockedBooks.map((book) => (
          <div
            key={book.id}
            className={`p-4 border border-border rounded-lg relative ${
              balance < book.price ? 'bg-gray-100/50' : 'bg-green-50'
            }`}
          >
            <h3 className="font-medium mb-2">{book.title}</h3>
            <p>Price: ${book.price}</p>
            {balance < book.price && (
              <span className="absolute top-2 right-2 text-red-500 font-bold">Locked</span>
            )}
            {balance >= book.price && (
              <span className="absolute top-2 right-2 text-green-600 font-bold">Unlocked!</span>
            )}
          </div>
        ))}
      </div>

      <Link href="/catalog">
        <Button className="mt-8">Back to Catalog</Button>
      </Link>
    </div>
  );
}
