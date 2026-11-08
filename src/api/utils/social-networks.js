function getProfilePath(url, hostPattern) {
   if (!url) return null;

   try {
      const parsed = new URL(url);

      if (!hostPattern.test(parsed.hostname)) return null;

      const match = parsed.pathname.match(/^\/@([^/]+)\/?$/);
      return match ? match[1] : null;
   } catch {
      return null;
   }
}

function getTwitter(redes) {
   if (!redes.twitter) return null;

   try {
      const url = new URL(redes.twitter);
      if (!/^(www\.)?(twitter\.com|x\.com)$/.test(url.hostname)) return null;

      const match = url.pathname.match(/^\/([^/]+)/);
      return match ? `@${match[1]}` : null;
   } catch {
      return null;
   }
}

function getBluesky(redes) {
   if (!redes.bluesky) return null;

   try {
      const url = new URL(redes.bluesky);
      if (url.hostname !== "bsky.app") return null;

      const match = url.pathname.match(/^\/profile\/([^/]+)/);
      return match ? `@${match[1]}` : null;
   } catch {
      return null;
   }
}

function getMastodon(redes) {
   if (!redes.mastodon) return null;

   try {
      const url = new URL(redes.mastodon);
      const account = url.pathname.match(/^\/@([^/]+)\/?$/)?.[1];

      if (!account) return null;

      // Fediverse-style handles already contain their instance.
      return account.includes("@")
         ? `@${account}`
         : `@${account}@${url.hostname}`;
   } catch {
      return null;
   }
}

function getFediverso(redes) {
   if (!redes.fediverso) return null;

   try {
      const url = new URL(redes.fediverso);

      if (url.hostname !== "mastodon.gal") return null;

      // Example: /@pi@pilarmera.gal
      const account = url.pathname.match(/^\/@([^/]+)\/?$/)?.[1];

      if (!account) return null;

      return `@${account}`
   } catch {
      return null;
   }
}

export function getSocialLinks(redes = {}) {
   const social = {
      twitter: getTwitter(redes),
      bluesky: getBluesky(redes),
      mastodon: getMastodon(redes) || getFediverso(redes),
      fediverso: getFediverso(redes),
   };

   return Object.fromEntries(
      Object.entries(social).filter(([, value]) => value !== null)
   );
}