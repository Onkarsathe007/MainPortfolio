import React from 'react';
import { GitHubCalendar } from 'react-github-calendar';

export default function GitHubCalendarSection() {
  return (
    <section className="py-20 bg-white">
      <div className="text-center mb-12">
        <h3 className="text-sm uppercase tracking-wide text-gray-500">
          My Coding Journey
        </h3>
        <h2 className="text-4xl font-bold">GitHub Contributions</h2>
      </div>

      <div className="max-w-6xl mx-auto px-4">
        <div className="rounded-3xl border-2 border-gray-200 p-8 bg-white">
          <GitHubCalendar
            username="onkarsathe007"
            blockSize={15}
            blockMargin={5}
            fontSize={16}
            colorScheme="light"
          />
        </div>
      </div>
    </section>
  );
}
