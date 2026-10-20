# Discussion 7: Practice questions and answers

The first set follows Leo Cui’s AI-data-center walkthrough. The second follows [IBM’s virtualization article](https://www.ibm.com/think/topics/virtualization), its [virtualization explainer](https://mediacenter.ibm.com/media/Virtualization%2BExplained/1_928hgo38), [containerization video](https://mediacenter.ibm.com/media/Containerization%2BExplained/1_89e49wds), and [Techsplainers episode](https://listen.casted.us/public/95/Techsplainers-by-IBM-28b0cf76/622ff92f). The Think Keynote is excluded as directed in the supplied material.

## 1. From a question to an answer — Leo Cui

**1. Why does an AI service need more than an ordinary web server?**

**Answer:** Generating an answer requires a trained model to perform many calculations for the prompt and each output token. At scale, those calculations need specialized processors, fast memory, networking, storage, power, and cooling. Cui uses a dinner-question example to trace how those pieces work together.

**2. How does a generative answer differ from a conventional search result?**

**Answer:** A search engine primarily retrieves and ranks existing material from an index, while a language model generates a response token by token. In practice, services may combine search and generation; retrieval-augmented generation is one example. The distinction explains why a generated response calls on model computation even when a relevant page already exists.

**3. What is a token? Is it the same as a word?**

**Answer:** A token is a unit of text produced by a tokenizer. It may be a whole word, part of a word, punctuation, or another text fragment, so token count does not equal word count. The system converts input text to token IDs and generates output one token at a time.

**4. What is a FLOP, and what does it describe?**

**Answer:** A FLOP is a floating-point arithmetic operation, such as an addition or multiplication. FLOPs describe computational work or, when stated per second, a rate of arithmetic operations. They do not by themselves measure the speed of an entire AI service, which can also be limited by memory and network movement.

**5. What is the difference between training and inference?**

**Answer:** Training adjusts model parameters using data and substantial computation. Inference uses an already trained model to process a new input and produce an output. A model may also be fine-tuned or retrained later, so training is not literally a one-time event for all AI systems.

**6. Why do larger models and more users increase infrastructure demand?**

**Answer:** A model with more parameters or longer inputs can require more computation and memory for each request. More simultaneous users increase the total rate of requests the service must handle. Better algorithms and hardware can offset some of that demand, so size alone does not determine a system’s usefulness or cost.

**7. What does Cui mean by a scaling law?**

**Answer:** He refers to the observed relationship in which increasing model size, training data, and computation has tended to improve model performance in a predictable way within studied ranges. It helps explain why firms build larger computing facilities. It is not a guarantee that every additional dollar produces the same improvement, or that size solves all problems.

**8. What happens before Cui’s dinner question reaches a GPU?**

**Answer:** The phone sends data through Wi-Fi or a cellular network to a service entry point. Routing and front-end servers receive the request; an API gateway or similar component may authenticate it, limit request rates, apply policies, and assemble the prompt with instructions and relevant conversation context. The precise path varies by service.

**9. What does tokenization do to the assembled prompt?**

**Answer:** It divides the text into tokens and maps them to numerical IDs that the model can process. System instructions, the user’s question, and any supplied context contribute to the input. Tokenization is a representation step; it does not itself understand or answer the question.

**10. What is prefill?**

**Answer:** Prefill is the phase in which a language model processes the input prompt and computes the attention information needed to begin generation. Much of the prompt can be processed in parallel, making this phase different from producing the output one token at a time. A longer prompt generally requires more prefill work.

**11. What is a KV cache, and why keep it?**

**Answer:** The key-value cache stores intermediate attention data for tokens already processed. During generation, the model can reuse those values instead of recomputing the entire previous sequence for every new token. The cache consumes fast memory and grows with context length and concurrent requests; it is not a durable record or humanlike memory of the conversation.

**12. What is decoding?**

**Answer:** Decoding is the repeated step of predicting the next output token from the prompt and tokens generated so far. Each new token depends on the preceding sequence, so a single answer is generated sequentially at this level. The token is then added to the context for the next step.

**13. Why does an answer appear gradually on the screen?**

**Answer:** Many services stream generated text as tokens become available, letting the user begin reading before the whole answer is finished. The visible speed reflects model computation, network delivery, and interface behavior. A service can choose to buffer output instead, so streaming is a design choice rather than a universal rule.

**14. What is batching, and why does it help?**

**Answer:** Batching lets a serving system process work from several requests together so the accelerator is used more efficiently. It can improve throughput and cost per request. Large or poorly timed batches can add waiting time for an individual user, so serving software balances throughput against latency.

## 2. The physical and software layers — Leo Cui

**15. What is power density in an AI rack?**

**Answer:** It is the electrical power drawn per rack or unit of space. Dense GPU systems can draw far more power in one cabinet than conventional server racks, creating matching demands on wiring, power distribution, cooling, and floor planning. Exact values differ by hardware and configuration.

**16. Why can a facility be delayed even if its servers are ready?**

**Answer:** It may still need utility approval, transmission capacity, transformers, substations, or new local distribution equipment. Those items can have long lead times. A data-center build therefore depends on electrical infrastructure beyond the computer hardware itself.

**17. What does “behind-the-meter” power mean?**

**Answer:** It generally means generation located on the customer side of the utility meter or directly serving a facility, such as on-site gas generation. It can reduce dependence on a particular grid connection, but the equipment still needs fuel, permits, maintenance, and emissions accounting. It does not erase impacts on the surrounding community.

**18. What do switchgear, UPS equipment, and backup generators each do?**

**Answer:** Switchgear controls and protects electrical distribution. A UPS supplies immediate short-term power or conditions the supply when an input fails. Backup generators can provide power over a longer outage after starting and stabilizing. The three perform different parts of the continuity plan.

**19. Why does computing create a cooling problem?**

**Answer:** Nearly all electrical energy used by processors and nearby equipment ultimately becomes heat. If that heat is not removed, components overheat or slow down. Higher rack power density concentrates more heat in the same physical space.

**20. Compare room-air cooling, rear-door heat exchangers, direct-to-chip cooling, and immersion cooling.**

**Answer:** Room-air cooling moves cooled air through racks. A rear-door heat exchanger captures heat at a rack’s exhaust. Direct-to-chip systems circulate liquid through cold plates attached near hot components. Immersion places compatible equipment in a nonconductive cooling fluid. Each still needs a path to reject the collected heat outside the room.

**21. What does a coolant distribution unit (CDU) do?**

**Answer:** A CDU pumps and controls coolant for liquid-cooled IT equipment and transfers heat into the facility’s larger cooling loop, often through a heat exchanger. It helps maintain suitable flow, pressure, and temperature. The rack loop and facility loop can remain separate fluids.

**22. What is PUE?**

**Answer:** Power usage effectiveness is total facility power divided by power used by the IT equipment. A value nearer 1 means less additional power is spent on cooling, distribution, and other overhead. PUE does not measure model quality, carbon emissions, water use, or whether the computing work itself is efficient.

**23. How can cooling choices affect water use?**

**Answer:** Evaporative cooling can reduce electrical demand while consuming water. Closed loops recirculate coolant at the rack, but heat still has to be rejected somewhere; the outdoor system may or may not use evaporation. Local climate and water availability influence the best design.

**24. What does a CPU do in an AI server?**

**Answer:** It runs the operating system and coordinates general-purpose tasks, input/output, scheduling, and data movement. It may perform some model work as well. The CPU remains essential even when most large parallel calculations run on GPUs.

**25. Why are GPUs suited to many AI computations?**

**Answer:** GPUs contain many execution units that can perform similar operations across large arrays of data. Matrix and vector operations common in neural networks can use this parallelism. The workload, software, memory capacity, and data-transfer costs determine whether a GPU is advantageous.

**26. What is high-bandwidth memory (HBM)?**

**Answer:** HBM is memory placed close to an accelerator and designed to supply data at very high bandwidth. It holds active model parameters and intermediate data that the GPU repeatedly accesses. It is fast and limited in capacity compared with bulk storage, so a server still needs other memory and storage tiers.

**27. Why can AI inference be limited by memory bandwidth?**

**Answer:** During token generation, the processor repeatedly needs model parameters and cached attention data. Its arithmetic units can wait if memory cannot supply those values quickly enough. More raw FLOPs do not solve a data-fetch bottleneck by themselves.

**28. What is a cluster, and why connect many accelerators?**

**Answer:** A cluster is a group of connected computers managed to work on related tasks. Multiple accelerators can split a model, dataset, or workload that is too large or slow for one device. The benefit depends on fast communication and software that coordinates the pieces.

**29. What are bandwidth and latency?**

**Answer:** Bandwidth is the amount of data a link can carry per unit time. Latency is the delay before a particular transfer arrives. A large AI cluster may need both: high bandwidth for large data exchanges and low latency when processors must repeatedly coordinate.

**30. What is the difference between “scale up” and “scale out” networking?**

**Answer:** Scale-up links tightly connect accelerators within a server or rack so they can share work with very fast communication. Scale-out links connect servers or racks across a larger cluster. Cui uses NVLink as an example of scale-up connectivity and InfiniBand or high-performance Ethernet for scale-out networks.

**31. How do InfiniBand and Ethernet fit into an AI cluster?**

**Answer:** Both can be used to connect compute nodes at high speed. InfiniBand is a specialized fabric designed for high-performance computing, while Ethernet is a widely used networking family that can be engineered for demanding cluster traffic. The choice depends on the required performance, software support, cost, and operating model; neither is automatically best for every cluster.

**32. Why use optical transceivers and fiber between racks?**

**Answer:** An optical transceiver converts electrical signals to light and back, allowing data to travel over fiber. Fiber can carry high-speed connections across longer distances than practical copper links at those speeds. Both ends need appropriate optics and careful cabling.

**33. What is the difference between HBM, ordinary DRAM, SSDs, and hard drives?**

**Answer:** HBM is very fast memory close to the accelerator; system DRAM provides active CPU memory. SSDs and hard drives are persistent storage, with SSDs generally faster and hard drives often cheaper per unit of bulk capacity. A system moves data among these tiers according to speed, capacity, and cost needs.

**34. What are model checkpoints, and where are they stored?**

**Answer:** Checkpoints save a model or job state so work can be resumed or a model version restored. They may be large and are typically written to persistent storage rather than left only in GPU memory. Storage throughput matters when many workers save or load them together.

**35. What roles do Linux and Kubernetes play?**

**Answer:** Linux is an operating system commonly used on servers. Kubernetes coordinates containerized applications across a cluster, including scheduling, restarting, and scaling them. It manages workloads; it is not a replacement for the physical servers, network, or GPU programming tools underneath.

**36. What is CUDA in Cui’s discussion?**

**Answer:** CUDA is NVIDIA’s platform and software ecosystem for programming its GPUs for general computation. It includes tools and libraries on which many AI applications depend. Moving a workload to another accelerator may require software changes and testing; this is a compatibility and engineering issue, not proof that alternatives are incapable.

**37. What does a model-serving engine do?**

**Answer:** It runs trained models for users and tries to use hardware efficiently. Serving systems can manage batching, KV caches, memory allocation, and decoding. Cui names vLLM and TensorRT as examples of software in this layer.

**38. What is quantization?**

**Answer:** Quantization represents some model numbers with fewer bits or lower precision. This can reduce memory use and sometimes speed computation, but the effect on output quality and performance must be checked for the particular model and task. It is one way serving software may lower cost.

**39. What is retrieval-augmented generation (RAG)?**

**Answer:** RAG retrieves relevant material, such as company documents, when a question arrives and puts that material into the model’s context before generation. The model then writes an answer using the supplied material. This connects search and generation; it does not guarantee the retrieved material is correct or that the answer cites it accurately.

**40. Why does Cui discuss utilization, depreciation, and customer demand?**

**Answer:** AI facilities require large up-front investments in hardware that may become less competitive as newer chips arrive. The financial outcome depends on how often the equipment is used, how long it remains useful, electricity and operating costs, and whether customers pay enough for the service. Cui’s market figures and forecasts are his investment analysis, not necessary facts for explaining how the technology works.

**41. What does Cui mean by a financing loop, and what is its main uncertainty?**

**Answer:** He describes technology suppliers, cloud operators, and AI developers investing in or buying from one another, so money can circulate within the same ecosystem while new capacity is built. The key question is whether paying end users and businesses eventually generate enough independent revenue to support those costs. This is Cui’s financial interpretation, not evidence that the transactions are improper.

## 3. Virtualization — IBM article and assigned media

**42. What is virtualization?**

**Answer:** It is the use of software to create virtual versions of computing resources, such as servers, storage, networks, or desktops. For example, one physical server can host several virtual machines with separately allocated CPU, memory, storage, and network access. Virtualization is a foundation for many cloud services.

**43. What are a host and a guest?**

**Answer:** The host is the physical machine supplying resources. A guest is a virtual machine running on that host. Each guest behaves like a separate computer and normally has its own operating system and applications.

**44. What is a hypervisor?**

**Answer:** A hypervisor is the software layer that creates and manages virtual machines and allocates the host’s hardware resources to them. It also helps isolate guests so that one VM cannot simply use another VM’s assigned memory. A hypervisor cannot allocate more usable physical capacity than the host can provide without performance consequences.

**45. What is the difference between Type 1 and Type 2 hypervisors?**

**Answer:** A Type 1, or bare-metal, hypervisor runs directly on the physical hardware and is common in server environments. A Type 2 hypervisor runs as an application on a host operating system and is common for desktop testing. Both create VMs, but the extra host-OS layer changes management and overhead.

**46. What makes a virtual machine a separate computer?**

**Answer:** It has virtualized hardware, its own guest operating system, applications, and allocated resources. Different VMs on one host can run different operating systems, such as Linux and Windows. Their separation is provided by the hypervisor and configuration, not by having dedicated physical hardware for each guest.

**47. What is resource pooling, and why does it improve utilization?**

**Answer:** Pooling lets several VMs draw from a shared physical capacity instead of reserving one underused server for each application. Administrators can allocate and adjust virtual CPU, memory, and storage to match workloads. Overcommitment or poor sizing can still cause contention, so virtualization does not create free resources.

**48. What benefits does IBM attribute to virtualization?**

**Answer:** It can consolidate hardware, make VMs faster to provision, support consistent management, and simplify replication or recovery. Fewer physical servers may reduce space, maintenance, and energy costs. Those benefits depend on workload, licensing, design, and available spare capacity.

**49. Can a VM be moved to another host to avoid downtime?**

**Answer:** It can be migrated or restarted elsewhere if the organization has compatible hosts, accessible data, network configuration, and a suitable migration or failover design. A host failure does not automatically move every VM safely. The virtualization explainer uses migration as an example of flexibility, while the article also points to redundant VMs.

**50. What is a VM snapshot, and is it a complete disaster-recovery plan?**

**Answer:** A snapshot records a VM state or storage point so it can be rolled back, for example after a bad change. It can help recovery, but it may live on the same storage as the VM and may not cover every failure. Separate backups, tested restoration, and redundant infrastructure are still needed for a robust plan.

**51. How did virtualization develop historically in IBM’s account?**

**Answer:** IBM traces it to mainframe time-sharing work such as CP-40 in the 1960s and the VM/370 product in the 1970s. Later x86 virtualization made it practical to run several operating systems on one ordinary server or PC. The key idea—sharing one physical machine among isolated computing environments—has persisted.

**52. What is desktop virtualization?**

**Answer:** It makes a desktop operating system available as a VM. With virtual desktop infrastructure, desktops run centrally and users reach them remotely; with local desktop virtualization, a person runs another OS as a VM on their own computer. The location of the VM is the main distinction.

**53. What is network virtualization?**

**Answer:** It represents and controls network connections or functions in software, allowing administrators to define virtual networks without rewiring every physical device. Software-defined networking separates some traffic-control decisions from forwarding hardware. Network-function virtualization can run functions such as a firewall or load balancer as software.

**54. What is storage virtualization?**

**Answer:** It combines physical storage devices into a logical pool that can be assigned and managed without exposing every underlying disk to users. A VM can receive a virtual disk even though its data resides across shared hardware. The approach makes capacity allocation more flexible; it does not replace redundancy or backups.

**55. How is data virtualization different from storage virtualization?**

**Answer:** Data virtualization presents a unified way for applications to query data from different sources and formats, often without moving it into one physical store. Storage virtualization pools underlying storage capacity and presents logical volumes or services. One abstracts access to information; the other abstracts storage hardware.

**56. What is application virtualization?**

**Answer:** It makes an application available without installing it in the ordinary way on a user’s local operating system. The app may run in a local isolated environment, stream components from a server, or run remotely while sending its interface to the user. This virtualizes the application experience, not necessarily an entire desktop.

**57. What does data-center virtualization mean?**

**Answer:** It abstracts servers, networks, and storage so administrators can create several logical environments on the same physical facility. Different customers can receive isolated virtual infrastructure. Cloud IaaS builds on this idea, although facilities still need real hardware, power, and operators.

**58. What are CPU and GPU virtualization?**

**Answer:** CPU virtualization presents virtual processors to VMs and schedules their work on physical CPUs. GPU virtualization lets a VM use a whole GPU through pass-through or share GPU resources with other VMs, depending on the design. These methods provide flexible access but still compete for finite processor and memory capacity.

**59. What is KVM?**

**Answer:** Kernel-based Virtual Machine is virtualization functionality in the Linux kernel that supports running VMs using processor virtualization features. It is one way a Linux host can act as a hypervisor platform. “KVM” here means Kernel-based Virtual Machine, not the keyboard-video-mouse remote-console abbreviation used in Discussion 6.

**60. How do IaaS, PaaS, and SaaS relate to virtualization?**

**Answer:** IaaS offers configurable virtual infrastructure such as servers, storage, and networking. PaaS offers a managed platform for building and running applications, while SaaS delivers a ready-to-use application. Virtualization often supports these services underneath, but the terms describe what the customer receives and manages.

**61. How does a container differ from a VM?**

**Answer:** A VM includes a guest operating system and virtualized hardware. A container packages an application and its dependencies while sharing the host’s operating-system kernel with other containers. Containers are often lighter and quicker to start, but their isolation model and OS compatibility differ from those of VMs.

**62. What are a container image, container runtime, and running container?**

**Answer:** An image is a packaged template containing application code and required dependencies. A runtime starts and manages an instance of that image; the running instance is a container. Sai Vennam’s video walks from a build description or manifest to an image and then to deployed containers.

**63. How does the Node.js and Python example explain container benefits?**

**Answer:** Vennam begins with several copies of a Node.js application, then adds a Python service that uses an image-recognition API. Separate containers let the Node.js and Python parts be packaged and scaled independently while avoiding a full guest OS for every copy. The example also shows how a consistent image helps prevent development-versus-production dependency problems.

**64. Does a container include everything needed regardless of the host?**

**Answer:** It carries its application and userspace dependencies, but it relies on a compatible host kernel and the resources or external services it needs. Portability is strongest across compatible container environments. A container image does not make hardware, kernel, networking, or data requirements disappear.

**65. How can VMs and containers be used together?**

**Answer:** A provider can run containers inside VMs, using VMs for tenant or operating-system isolation and containers for application packaging and scaling. This combines two abstraction layers. Kubernetes can coordinate the containers while a hypervisor manages the VMs beneath them.

**66. What security controls still matter in a virtualized environment?**

**Answer:** Administrators still need access controls, regular updates, network segmentation, encryption, monitoring, and backups. Isolation helps limit some failures, but a compromised guest, hypervisor flaw, misconfiguration, or shared-host problem can still cause harm. Snapshots and quick recreation support recovery but do not replace prevention and tested restoration.
