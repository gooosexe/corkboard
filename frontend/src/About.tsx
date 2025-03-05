export default function About() {
  return (
	<>
	
	<div className="max-w-2xl mx-auto p-6 space-y-6 text-center">
      <h1 className="text-3xl font-bold">About Corkboard</h1>
      <p className="text-lg text-muted-foreground">
        Corkboard is a simple, ephemeral content-sharing platform designed for quick, 
        temporary posts. Whether you want to share a thought, an image, or an idea, 
        Corkboard lets you post anonymously or with a username—no accounts, no clutter.
      </p>
      <div className="space-y-4 text-left">
        <h2 className="text-xl font-semibold">How It Works</h2>
        <ul className="list-disc list-inside space-y-2">
          <li><strong>Post anything</strong> – Text, images, or a mix of both</li>
          <li><strong>Stay anonymous or use a name</strong> – No sign-ups required</li>
          <li><strong>Auto-expiring posts</strong> – Everything disappears after 24 hours</li>
          <li><strong>Minimal & fast</strong> – Clean design, simple interactions</li>
        </ul>
      </div>
      <p className="text-lg text-muted-foreground">
        Corkboard is built to be a digital space for spontaneous sharing, free from 
        the pressure of permanence. Drop your thoughts, engage, and let them fade away naturally.
      </p>
    </div>
	</>
      );
}