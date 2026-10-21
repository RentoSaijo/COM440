# Discussion 8: Practice questions and answers

These questions follow the assigned Khan Academy Ancient and Modern cryptography lessons, then Professor Messer's hashing and signatures video, Cryptography 101's deployment lecture, and IBM's PKI explainer. The two Modern lesson explorations are covered through the concepts visible in their graphs.

## 1. Ancient cryptography — Khan Academy

### What is cryptography?

**1. What do plaintext, ciphertext, encryption, decryption, and a key mean?**

**Answer:** Plaintext is the original readable message. Encryption transforms it into ciphertext using an algorithm and a key; decryption uses the appropriate key to recover the plaintext. The key selects a particular transformation and should remain protected when the system requires secrecy.

**2. Who are Alice, Bob, and Eve, and what is the central problem in the lesson?**

**Answer:** Alice sends a message, Bob receives it, and Eve observes the communication. Alice and Bob want Bob to recover the message without Eve learning it. Later lessons also ask how Alice and Bob can arrange a secret key when they cannot meet first.

**3. Why can a cipher's algorithm be public while its messages remain secret?**

**Answer:** A sound cryptosystem bases protection on a sufficiently strong secret key, not on hiding how the algorithm works. Public scrutiny can expose weaknesses before attackers do. A known algorithm plus a weak or exposed key still fails.

### The Caesar cipher

**4. How does a Caesar shift work, and why is it weak?**

**Answer:** It replaces each letter with one a fixed number of positions away in the alphabet, wrapping around at the end. The small set of possible shifts can be tried exhaustively. It also preserves letter-frequency patterns.

**5. Toy calculation — what happens to `CAT` under a shift of three?**

**Answer:** `C → F`, `A → D`, and `T → W`, so `CAT → FDW`. Shifting `FDW` back three places restores `CAT`. This is an illustration, not secure encryption.

**6. What is frequency analysis, and why did Al-Kindi's idea matter?**

**Answer:** It compares the frequencies of symbols in ciphertext with expected language frequencies. In a long monoalphabetic substitution, common plaintext letters remain common under their replacement symbols. Al-Kindi's method showed that merely changing the alphabet does not erase the statistical structure of language.

**7. Does every short ciphertext reveal a useful frequency fingerprint?**

**Answer:** No. Short samples vary substantially by chance, and context matters. Frequency analysis becomes more informative as enough ciphertext from the same substitution accumulates.

### Polyalphabetic ciphers

**8. How does a polyalphabetic cipher differ from a single substitution alphabet?**

**Answer:** It uses several substitutions, often selected by successive letters of a repeating keyword. The same plaintext letter may therefore become different ciphertext letters at different positions.

**9. Why does the keyword make ordinary frequency analysis harder?**

**Answer:** It spreads the occurrences of a plaintext letter across several ciphertext letters, flattening the obvious whole-message fingerprint. If the keyword repeats, positions using the same keyword letter can still be separated into substreams with their own patterns.

**10. What can repeated patterns reveal about a polyalphabetic cipher?**

**Answer:** They can suggest the period or length of the repeated keyword. Once that length is estimated, an attacker can analyze each periodic substream like a simpler substitution cipher. A longer keyword helps only within the limits of the cipher's design and use.

### The one-time pad

**11. What are the conditions for a one-time pad's perfect-secrecy claim?**

**Answer:** Its key must be truly random, uniformly selected, at least as long as the message, secret from the attacker, and never reused. Sender and receiver must share the same pad and use the corresponding portion exactly once.

**12. Toy calculation — how does bitwise XOR encrypt and decrypt a pad segment?**

**Answer:** With message `1011` and pad `0110`, XOR gives `1101` because corresponding bits differ in positions one, two, and four. XORing `1101` with the same pad `0110` restores `1011`. This is the bitwise analogue of combining and undoing the lesson's random alphabet shifts; four bits alone are insecure.

**13. Why does a fresh random pad hide all same-length candidate messages?**

**Answer:** For every candidate plaintext of that length, exactly one pad would produce the observed ciphertext. If all pads are equally likely, the ciphertext does not favor one candidate over another. The guarantee concerns message content, assuming the pad conditions hold.

**14. What happens if a pad is reused, and what makes a real one-time pad inconvenient?**

**Answer:** Reuse links ciphertexts through the same key and can expose information about both messages. A genuine pad also requires secure delivery and storage of as many random key symbols as the parties will send, which is difficult at scale.

### Frequency stability

**15. What does the coin-toss film teach about randomness and frequency?**

**Answer:** Independent fair tosses tend toward a roughly even overall proportion over many trials, but finite samples need not be exactly balanced. Runs and local imbalances are normal. We should not reject a sequence as nonrandom merely because it contains several identical outcomes in a row.

**16. Why can a human's invented random-looking sequence be detectable?**

**Answer:** People often avoid long runs or impose an overly even pattern. Those choices alter the distribution of sequences from what independent random choices would produce. A cipher that relies on such human choices can leak information.

### The Enigma encryption machine

**17. What did Enigma's rotors contribute?**

**Answer:** The rotors changed the letter substitution as the machine advanced, so a repeated plaintext letter did not necessarily produce the same ciphertext letter. The initial settings and related configuration served as key material.

**18. Why did many possible Enigma settings not guarantee safety?**

**Answer:** Codebreakers exploited both machine structure and how people used it. Predictable message content supplied plausible plaintext guesses, called cribs, and operator habits reduced uncertainty about settings. Key-space size alone does not measure the whole system's resistance.

**19. How did Enigma's no-self-encryption property help a codebreaker?**

**Answer:** The machine never mapped a letter to itself. If a guessed crib aligned a letter with the same ciphertext letter at a position, that alignment or candidate setting could be rejected immediately.

**20. What general lesson does Enigma give about implementation and use?**

**Answer:** A complicated cipher can still be weakened by exploitable rules, repeated procedures, predictable text, and human behavior. The historical example does not prove that changing only one or two machine features would have made it unbreakable.

### Perfect secrecy

**21. What does perfect secrecy mean more precisely than “very hard to crack”?**

**Answer:** Learning the ciphertext does not change an observer's probability for any possible plaintext of the same length. Even unlimited computation adds no information from that ciphertext under the model's assumptions. A computationally secure scheme instead aims to make attacks infeasible with realistic resources.

**22. Why does the one-time pad meet that definition when used correctly?**

**Answer:** Every same-length plaintext is compatible with the ciphertext under one equally likely pad. Thus the ciphertext alone cannot distinguish among those plaintexts. The conclusion fails if keys are biased, known, too short, or reused.

**23. What information can an ideal pad still leave visible?**

**Answer:** It does not automatically hide that a message was sent, who communicated, or the message's length. Perfect secrecy is a precise statement about the plaintext content in the specified model.

### Pseudorandom number generators

**24. What is a seed, and why does the same seed reproduce a pseudorandom sequence?**

**Answer:** A seed is the starting state of a deterministic generator. Given the same seed and algorithm, the same sequence follows. This lets two parties reproduce a long keystream from shorter shared information.

**25. What did von Neumann's middle-squares method illustrate?**

**Answer:** It repeatedly squared a number and used middle digits as the next state. It illustrates how a deterministic rule can generate a random-looking sequence, but it is a historical teaching example with serious weaknesses, not a cryptographically secure generator.

**26. What is a generator's period, and why must a finite-state generator eventually repeat?**

**Answer:** The period is the number of output steps before the state cycle repeats. A deterministic machine with finitely many states must eventually revisit one; from that point its future repeats. A sufficiently large state space can make repetition irrelevant for a practical lifetime, but it does not make the sequence truly random.

**27. Why is a short or guessable seed dangerous?**

**Answer:** It restricts the output to a small collection of possible sequences. Eve can try seeds and compare generated output with information she knows. A secure generator needs an unpredictable seed and a well-analyzed algorithm.

**28. Is a pseudorandom keystream the same as a true one-time pad?**

**Answer:** No. A secure pseudorandom keystream aims for computational security against feasible attackers; a correctly used truly random pad has information-theoretic perfect secrecy. Both still require a secure way to establish the seed or pad.

## 2. Modern cryptography — Khan Academy

### The fundamental theorem of arithmetic

**29. What are a prime, a composite, and a prime factorization?**

**Answer:** A prime greater than one has only one and itself as positive divisors. A composite greater than one has other positive divisors. Prime factorization expresses an integer greater than one as a product of primes; for example, `30 = 2 × 3 × 5`.

**30. What does the fundamental theorem of arithmetic assert?**

**Answer:** Every integer greater than one has exactly one prime factorization, ignoring the order of factors. The building operation is multiplication, even though one line of the transcript casually says “addition.”

**31. Is it equally hard to multiply chosen primes and to recover them from their product?**

**Answer:** No. Multiplication is efficient, while factoring a suitably chosen large product is difficult for known classical methods. That asymmetry motivates RSA. It is an assumption about feasible attacks and parameter choices, not a proof that factoring can never become easier.

### Public-key cryptography: the problem

**32. What problem arises when Alice and Bob have never met?**

**Answer:** Symmetric encryption needs a shared secret, but sending that secret openly lets Eve copy it. A method for establishing or using keys across an observed channel is needed.

**33. What does the color-mixing analogy represent?**

**Answer:** Alice and Bob begin with a public color, add private colors separately, exchange the mixtures, and each adds their own private color to the other's mixture. The analogy conveys an operation that is easy forward but difficult to reverse from its public result. Real cryptography uses mathematics, not paint.

**34. How is public-key encryption conceptually different from shared-key encryption?**

**Answer:** A sender can use a recipient's published encryption key without possessing the recipient's private decryption key. Shared-key encryption uses a secret available to both parties. Either system still requires assurance that a purported public key truly belongs to the intended recipient.

### Modular arithmetic and the discrete logarithm

**35. What does `a mod n` mean?**

**Answer:** It is the remainder after dividing `a` by `n`; numbers differing by a multiple of `n` are congruent modulo `n`. The lesson compares this to a clock that wraps around.

**36. Toy calculation — what are `46 mod 12` and `3^4 mod 17`?**

**Answer:** `46 = 3 × 12 + 10`, so `46 mod 12 = 10`. Also `3^4 = 81 = 4 × 17 + 13`, so `3^4 mod 17 = 13`. The small moduli make the mechanics visible, not secure.

**37. What is a generator in the lesson's prime-modulus setting?**

**Answer:** It is a value whose successive powers modulo a prime cycle through the nonzero residues in the chosen multiplicative group. For example, a suitable generator modulo 17 can reach residues 1 through 16; it does not generate zero as a nonzero power modulo 17.

**38. What is the discrete-logarithm problem?**

**Answer:** Given a group, its generator `g`, and `y = g^x mod p`, recover the exponent `x`. Calculating `y` from `x` is efficient; reversing it in a suitable large group is hard for known classical methods.

### Diffie–Hellman key exchange

**39. What values are public and private in basic Diffie–Hellman?**

**Answer:** The group parameters `p` and `g`, and the exchanged values `A = g^a mod p` and `B = g^b mod p`, are public. Alice keeps `a` private and Bob keeps `b` private.

**40. Why do both parties calculate the same secret?**

**Answer:** Alice computes `B^a mod p = g^(ba) mod p`; Bob computes `A^b mod p = g^(ab) mod p`. Since `ab = ba`, their results match.

**41. Toy calculation — complete a small Diffie–Hellman exchange.**

**Answer:** Let `p = 23`, `g = 5`, Alice's secret `a = 6`, and Bob's secret `b = 15`. Alice sends `5^6 mod 23 = 8`; Bob sends `5^15 mod 23 = 19`. Alice gets `19^6 mod 23 = 2`, and Bob gets `8^15 mod 23 = 2`. These deliberately tiny values are insecure.

**42. What is the man-in-the-middle weakness of unauthenticated key exchange?**

**Answer:** Eve can substitute her own public value in each direction, establish one key with Alice and another with Bob, and relay or alter messages. Neither endpoint knows it is talking to Eve unless it authenticates the exchange.

**43. Does Diffie–Hellman directly encrypt a message?**

**Answer:** No. It establishes shared secret material, from which a protocol derives encryption keys. A separate symmetric encryption method then protects the messages.

### RSA encryption: Steps 1 and 2

**44. What does the “open lock” analogy convey about RSA?**

**Answer:** Alice can publish a way to lock a message for her while keeping the unlocking information private. Anyone can use her public encryption key; only the holder of the matching private decryption key should recover the protected message.

**45. What is a trapdoor one-way function?**

**Answer:** Its forward calculation is efficient and its reversal is hard without special secret information. The trapdoor makes reversal feasible for the legitimate key holder.

**46. What are the public and private RSA components in the lesson?**

**Answer:** The public key contains modulus `n` and exponent `e`; the private key includes exponent `d` and is usually associated with the secret prime factors of `n`. Real systems protect the whole private-key material, not merely the printed value of `d`.

**47. What are the textbook RSA arithmetic operations?**

**Answer:** For a suitable encoded message integer `m`, encryption gives `c = m^e mod n`, and decryption gives `m = c^d mod n`. Secure applications require an appropriate padding/encoding scheme; bare textbook RSA should not be used to encrypt arbitrary text.

**48. Why is modular exponentiation useful here?**

**Answer:** Computers can calculate powers modulo a number efficiently without writing out the enormous full power. The public calculation can therefore be practical even when reversing it without the private information is difficult.

### RSA encryption: Step 3 and Time Complexity Exploration

**49. How does RSA form its modulus?**

**Answer:** It chooses two distinct large secret primes `p` and `q` and multiplies them to get public `n = pq`. Alice can calculate with the factors; an attacker who knows only `n` must confront the factoring problem to use the same route.

**50. What does the Time Complexity Exploration show?**

**Answer:** Its animation compares the work of multiplying two numbers with that of factoring their product as the illustrated input size grows. Factoring becomes much more costly in the displayed model. The plot motivates the asymmetry; its exact timings are not a universal guarantee for all machines, algorithms, or input sizes.

**51. Does a large number automatically give strong RSA security?**

**Answer:** No. The factors must be appropriately generated, key sizes and padding must meet current practice, the private key must remain secret, and implementation must resist attack. A toy number or weakly generated factors are easy to break.

### Euler's totient function and Euler Totient Exploration

**52. What is Euler's totient `φ(n)`?**

**Answer:** It counts the integers from 1 through `n` that are relatively prime to `n`, meaning their greatest common divisor with `n` is 1.

**53. Toy calculation — why is `φ(8) = 4`, and what is `φ(7)`?**

**Answer:** Only `1, 3, 5, 7` among `1` through `8` are coprime to 8, so `φ(8) = 4`. Because 7 is prime, all `1` through `6` are coprime to it, so `φ(7) = 6`.

**54. Why does `φ(pq) = (p − 1)(q − 1)` for distinct primes?**

**Answer:** Exactly `p − 1` residues below `p` and `q − 1` residues below `q` are coprime to the respective primes; the totient is multiplicative for coprime factors. The qualification “coprime” matters: `φ(ab) = φ(a)φ(b)` is not true for arbitrary `a` and `b`.

**55. What is visible in the Euler Totient Exploration?**

**Answer:** The plotted totient values rise to an upper line at prime inputs because `φ(p) = p − 1`. Composite inputs appear lower according to how many numbers share factors with them. The graph helps relate prime structure to the totient; it is an exploration, not another video transcript.

**56. What condition belongs on Euler's theorem?**

**Answer:** If `gcd(m,n) = 1`, then `m^φ(n) ≡ 1 (mod n)`. Dropping the coprimality condition makes that simplified statement false. RSA's full correctness can be handled more generally, but the lesson's short derivation uses this condition.

### RSA encryption: Step 4

**57. How are RSA's exponents chosen?**

**Answer:** Choose public `e` relatively prime to `φ(n)`, then find private `d` such that `ed ≡ 1 (mod φ(n))`. In other words, `d` is the modular inverse of `e` modulo the totient.

**58. Toy calculation — build a small RSA key.**

**Answer:** Let `p = 5`, `q = 11`, so `n = 55` and `φ(n) = 4 × 10 = 40`. Choose `e = 3`; since `3 × 27 = 81 = 2 × 40 + 1`, `d = 27`. The public key is `(55, 3)` and the private exponent is 27. These numbers are far too small for security.

**59. Toy calculation — encrypt and decrypt `m = 2` with that key.**

**Answer:** Encryption gives `c = 2^3 mod 55 = 8`. Decryption gives `8^27 mod 55 = 2`, restoring the message integer. The calculation illustrates the inverse relationship; a real scheme also needs secure encoding and padding.

**60. What is secret in the factorization-based trapdoor?**

**Answer:** The prime factors `p` and `q` reveal `φ(n)`, which permits calculation of the private exponent from the public exponent. The public modulus `n` and exponent `e` do not disclose the factors efficiently under the intended hardness assumption and appropriate parameters.

**61. How do RSA encryption and Diffie–Hellman differ?**

**Answer:** RSA encryption uses a recipient's public encryption key and matching private decryption key. Diffie–Hellman is a two-party key agreement that derives a shared secret from both parties' contributions. Neither alone authenticates an arbitrary public key's owner.

**62. Are the lesson's small RSA numbers or historical claims a deployment guide?**

**Answer:** No. Small values make the algebra visible but are trivially attackable. Modern protocols use vetted parameters, padding and key-exchange designs, and authenticated key distribution; the lesson's statement that every internet user uses RSA should not be read literally as a current universal claim.

## 3. Hashes and digital signatures — Professor Messer

**63. What is a cryptographic hash, and is it encryption?**

**Answer:** A hash maps an input to a fixed-length digest. It is not reversible encryption: the digest is not a ciphertext from which the original file can be decrypted. SHA-256 outputs 256 bits, commonly written as 64 hexadecimal characters.

**64. What is the avalanche effect in the punctuation example?**

**Answer:** Changing the final period in “My name is Professor Messer.” to an exclamation point produces a substantially different digest. This sensitivity makes accidental changes easy to detect, although the digest alone does not prove who supplied a file.

**65. What is a collision, and are collisions impossible for SHA-256?**

**Answer:** A collision is a pair of different inputs with the same digest. Collisions are mathematically unavoidable because fixed-length outputs cover fewer values than all possible inputs. The security goal is to make finding a useful collision infeasible. MD5 has practical collision attacks and is unsuitable when collision resistance matters.

**66. What does checking a downloaded file's hash establish?**

**Answer:** It establishes that the downloaded bytes match the bytes represented by a trusted reference digest, barring a successful hash attack. If an attacker controls both the file and the digest you read, the comparison does not authenticate the file's source.

**67. How should a service store password verifiers?**

**Answer:** Use a distinct random salt per account with a purpose-built, configurable-cost password-hashing scheme, and store the salt, scheme settings, and resulting verifier. At login, process the entered password the same way and compare. Plaintext passwords should not be stored; a quick SHA-256 call with a salt is not enough against offline guessing.

**68. What does a salt do, and what does it not do?**

**Answer:** It makes the same password yield different stored outputs and defeats reuse of one precomputed rainbow table across many accounts. A salt is normally stored openly and does not stop an attacker from guessing each weak password with the known salt. The costly password-hashing scheme raises that per-guess cost.

**69. How does Alice sign “You're hired, Bob,” and how does Bob verify it?**

**Answer:** Alice's application hashes the message and uses her private signing key with a signature algorithm to produce a signature. Bob uses the received message, signature, and Alice's authentic public verification key to check it. A changed message or invalid signature fails verification. The example's message can remain readable because signing is not encryption.

**70. What do integrity, authentication, and non-repudiation mean here?**

**Answer:** Integrity means the signed message has not been altered without detection; authentication links it to the holder of the signing key. Non-repudiation refers to evidence that the signer cannot plausibly deny signing, but its real-world strength depends on key custody, identity binding, and legal context.

**71. Why is “encrypt the hash with the private key” an incomplete signature definition?**

**Answer:** Signature algorithms have specified signing and verification operations; many are not encryption algorithms at all. The phrase may help illustrate an RSA-like relationship, but it misdescribes signatures such as ECDSA and should not be treated as a general procedure.

## 4. Real-world deployment — Cryptography 101

**72. What are symmetric encryption, a MAC, and authenticated encryption used for?**

**Answer:** Symmetric encryption protects confidentiality with a shared secret. A message authentication code (MAC) helps a party with the shared secret detect alteration and authenticate the message within that shared-key relationship. Authenticated encryption such as AES-GCM combines confidentiality with integrity/authenticity checks under appropriate key and nonce use.

**73. What is the difference between a MAC and a digital signature?**

**Answer:** A MAC uses a secret shared by the participating parties; either holder could create a valid tag. A digital signature uses a private signing key and can be checked by anyone who has an authentic public verification key. That makes signatures suitable for publicly verifiable software updates.

**74. Why does a secure channel need more than a shared-key cipher?**

**Answer:** The parties must first establish a fresh secret key and know that they established it with the intended peer. They also need a method that detects tampering, correct nonce handling, and suitable key protection. Encryption without authentication can leave an active attacker in control of the exchange.

**75. What does elliptic-curve Diffie–Hellman contribute to the lecture's channel example?**

**Answer:** ECDH lets Alice and Bob exchange public curve points and derive shared secret material from their respective private values. A key-derivation step turns that material into session keys. The exchanged points still need authentication to resist a man-in-the-middle attack.

**76. How can signatures help authenticate exchanged key material?**

**Answer:** Each party can sign the relevant exchange data and the other can verify it with that party's authentic public verification key. The next question is how to obtain the authentic verification key in the first place; certificates are one common answer.

**77. Why sign a software update that is publicly available?**

**Answer:** The update need not be confidential to every recipient. Its signature lets recipients check that the approved vendor's key signed those bytes and that the code was not altered in transit. That verification works only if recipients already trust the correct public key.

**78. How did the historical GSM example establish a subscriber secret?**

**Answer:** A SIM held a subscriber-specific symmetric secret, and the provider retained a corresponding copy. Distribution of the SIM put matching secret material at both ends without transmitting it openly over the radio when a call began.

**79. What did GSM's challenge-response step do, and why use a fresh challenge?**

**Answer:** The network sent a random challenge; the SIM computed a keyed response that the provider could verify. A fresh challenge made a previously recorded response unlikely to pass in a later session, preventing straightforward replay.

**80. What are the security limits of the lecture's GSM example?**

**Answer:** It describes protection of the handset-to-network radio link, not end-to-end encryption between two callers. The original GSM arrangement authenticated the handset to the network without equivalent base-station authentication for the handset, and the provider had to protect many subscriber secrets.

**81. What caused the PlayStation signature failure?**

**Answer:** Sony reused a per-signature secret value in ECDSA. Reusing that nonce across signatures lets an attacker recover the private signing key, after which unauthorized software can be signed to pass verification. The failure was in key/nonce handling, not in the basic idea of public verification.

**82. Why did a verification key embedded in console firmware complicate recovery?**

**Answer:** If consoles keep trusting an exposed signing key, changing only the vendor's signing process does not make old devices reject forged signatures. A deployment needs a credible path to replace or revoke keys trusted by already-distributed devices.

**83. What stages belong to key management?**

**Answer:** Secure generation, distribution and authentication, storage and access control, use, rotation, revocation, and eventual retirement. The lecture emphasizes that these lifecycle tasks and usability often dominate large-scale security work.

**84. Why do vetted algorithms and libraries not remove all deployment risk?**

**Answer:** An implementation can leak through timing or other side channels, mishandle nonces, expose keys, or be configured incorrectly. Human workflows can also cause errors. Vetted primitives and libraries reduce risk when used properly, but the whole system must be designed and operated securely.

**85. Did this assigned lecture teach the later TLS, Bluetooth, cloud, or Signal protocols in detail?**

**Answer:** No. It previewed later lectures on those topics. For this discussion, its developed examples are secure-channel ingredients, public verification, GSM, PlayStation, and the general challenges of key management and usability.

## 5. Public-key infrastructure — IBM

**86. What problem does a public-key infrastructure solve?**

**Answer:** It helps users obtain an authentic binding between a public key and an identified subject, such as a web domain. Without that binding, an attacker can substitute its own public key and defeat otherwise sound encryption or key agreement.

**87. What are a certificate signing request and a certificate?**

**Answer:** A website operator creates a key pair and sends a certificate signing request containing its public key and requested identifying details to a certificate authority. After its checks, the CA issues a signed certificate that binds a public key to the verified domain under stated validity conditions.

**88. What is a certificate authority, and what does its signature prove?**

**Answer:** A CA is an entity trusted to validate and issue certificates under its rules. Its signature lets a browser detect certificate alteration and verify that the CA issued the binding. It does not guarantee that every action by the website is honest or safe.

**89. What is a certificate chain or chain of trust?**

**Answer:** The site certificate may be signed by an intermediate CA, which is itself linked by signatures to a root CA in the browser or operating system's trust store. The browser checks that chain and the intended domain, along with relevant validity conditions, before relying on the site key.

**90. Must a certificate be kept secret or fetched from the CA for every request?**

**Answer:** No. The certificate contains public information and can be distributed through an untrusted channel because its signed contents can be verified. Signature verification does not inherently require contacting the CA each time, though checking status or fetching missing chain information may involve network services.

**91. How does the server prove it has the private key corresponding to its certificate?**

**Answer:** In a modern secure connection, the server performs a protocol-defined proof, commonly a signature over handshake data, using that private key. The browser verifies it with the certified public key. The certificate alone is insufficient if an attacker merely copies it.

**92. What does the browser's lock icon establish, and what does it not establish?**

**Answer:** It indicates that the browser has established an authenticated, encrypted connection to the named domain under its trust rules. It does not certify the site's content, products, or motives, nor protect against a user willingly sending data to a malicious but properly certified domain.

**93. Why combine asymmetric methods with symmetric encryption?**

**Answer:** Public-key signatures and authenticated key exchange help identify the peer and establish fresh shared keys. Symmetric encryption is efficient for protecting the ongoing application data. The roles differ; a public/private pair is not simply two interchangeable keys for arbitrary encryption and decryption.

**94. How should a website protect its private key?**

**Answer:** Restrict access, protect the host and management accounts, and where appropriate use hardware that keeps the key from being exported. A secure chip helps guard the key but cannot repair a compromised application or a wrongly issued certificate by itself.

**95. What connects the first Alice–Bob–Eve example to PKI?**

**Answer:** Confidentiality requires a sound cipher and appropriate secret material, but an active Eve can replace public values unless Alice and Bob authenticate them. PKI is one scalable way to distribute the authentic public keys needed for that authentication. The entire chain—from randomness and private-key custody to certificate validation—must hold.
