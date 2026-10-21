# Discussion 6: Practice questions and answers

The questions follow the seven assigned materials in order. Answers focus on concepts, functions, comparisons, and examples likely to be useful in a short-answer discussion.

## 1. Data center equipment — Sarah Renaud

**1. What is a data center, and what are its main components?**

**Answer:** A data center is a facility that houses computing equipment and keeps it operating. Its core systems are servers, memory and storage, network equipment, power distribution and backup, cooling, physical security, and management software. The equipment works as a system: a fast server is of little use if it lacks data, network access, electricity, or cooling.

**2. What does a server do, and why are servers mounted in racks?**

**Answer:** A server provides computing resources or services to other computers, such as running an application, storing data, or answering requests. Racks organize many servers in a compact, serviceable space and give them structured access to power, cooling, and network cabling. Blade servers take density further by placing multiple server modules in a shared chassis.

**3. What are the functions of a CPU, GPU, and RAM in a server?**

**Answer:** The CPU executes general-purpose instructions and coordinates the operating system and other components. A GPU performs many similar calculations in parallel, which is useful for graphics and suitable AI workloads. RAM holds active data and instructions for quick access; it is working memory, so its contents do not serve as durable storage when power is lost.

**4. How do RAM, SSDs, and hard drives differ?**

**Answer:** RAM is fast, volatile working memory. SSDs and hard drives retain data without power. SSDs use flash memory and generally offer faster access, while hard drives use spinning magnetic disks and often provide less expensive capacity for large, less frequently accessed datasets.

**5. What is a storage area network (SAN), and how do block and file storage differ?**

**Answer:** A SAN makes shared storage available to servers over a dedicated storage network, commonly as block devices. Block storage gives a server addressable blocks that it can format with a file system or use for a database. File storage presents named files and directories through a shared file system. Either can hold many kinds of data; the choice depends on how applications need to access it, not simply whether data is “structured.”

**6. What do switches, routers, and firewalls do?**

**Answer:** A switch connects devices within a network and directs traffic to the appropriate local port. A router connects different networks and chooses where packets go next. A firewall applies rules to allow or block traffic. Fiber-optic and copper cables carry the signals between this equipment and the servers.

**7. Why does a data center need both a UPS and a generator?**

**Answer:** An uninterruptible power supply (UPS) bridges a short loss of utility power immediately and can condition the power delivered to equipment. A generator can supply power for a longer outage but needs time to start and stabilize. Neither removes the need for fuel, testing, maintenance, and sound transfer procedures.

**8. What do air handlers, chillers, and cooling towers contribute?**

**Answer:** Air handlers move warm server-room air across cooling coils and send cooler air back to the equipment. Chillers remove heat from a water or coolant loop; cooling towers or other outdoor equipment reject that heat to the environment. Humidity and airflow also matter because excess heat, moisture, or condensation can damage hardware.

**9. What is physical security in a data center?**

**Answer:** It is the control and monitoring of who can reach the building, rooms, racks, and equipment. Examples include badges, biometric checks, cameras, alarms, locked cages, and access logs. Physical controls protect both hardware and the data it contains; network security is a separate, complementary layer.

**10. What is virtualization, and why is it useful in a data center?**

**Answer:** Virtualization divides physical computing resources into software-defined environments, such as virtual machines. Several workloads can share a server while remaining separately managed, improving utilization and making provisioning easier. The host still has finite CPU, memory, storage, and network capacity.

**11. What do redundancy, modular design, and cable management accomplish?**

**Answer:** Redundancy provides an alternative component or path if one fails. Modular racks and replaceable components make expansion and repair easier. Labeled, organized cabling helps technicians identify connections and avoid accidental disconnections during maintenance. These practices reduce risk but cannot guarantee zero downtime.

**12. What other practices help keep a data center safe and efficient?**

**Answer:** Fire detection and suppression protect equipment and people, while routine inspection catches worn parts before they fail. Monitoring can spot abnormal temperature, power, or device behavior and guide preventive maintenance. Efficient cooling and careful capacity planning can reduce energy and water use without weakening reliability.

## 2. Applied Digital tour — Level1Techs

**13. What is a GPU supercluster?**

**Answer:** It is a group of GPU servers linked by high-speed networking and coordinated to run large AI or scientific workloads. “Supercluster” is also a vendor term in the tour; the important idea is that many machines cooperate as a computing system. The facility must supply adequate power, cooling, storage, and network capacity before those GPUs can be useful.

**14. Why test a new data hall with load banks before installing servers?**

**Answer:** Load banks draw a controlled electrical load and release heat, simulating the demands of a populated rack or aisle. The operator and utility can check power distribution, balancing, cooling, and emergency behavior before expensive computing equipment arrives. A load test verifies the supporting facility, not the performance of an AI model.

**15. What are dual power rails or feeds?**

**Answer:** They are separate power paths into a rack or device. Equipment with redundant power supplies can continue operating if one path fails, provided the other path and its capacity remain healthy. The tour shows that redundancy must extend beyond a second plug to upstream distribution and transformers.

**16. What are hot and cold aisles?**

**Answer:** Racks are arranged so that their air intakes face a cool aisle and their exhausts face a hot aisle. Separating the two air streams limits recirculation and helps cooling systems remove heat efficiently. In the tour, heated exhaust is collected and carried away above the racks.

**17. Why do GPU clusters need high-bandwidth, low-latency connections?**

**Answer:** GPUs working on one job exchange data and intermediate results. Bandwidth limits how much data can move per second, while latency is the delay before a transfer arrives. If communication is too slow, GPUs spend time waiting instead of calculating. The exact wiring and protocol depend on the cluster design.

**18. Which four kinds of network traffic are distinguished in the tour?**

**Answer:** The **management network** supports monitoring and remote control; the **GPU or cluster fabric** carries communication among compute nodes; the **storage network** moves datasets and checkpoints; and the **customer-facing network** lets clients submit jobs and retrieve results. Separating them helps with performance, access control, and troubleshooting.

**19. Why does fiber-cable distance matter in cluster design?**

**Answer:** Cable length affects which optical transceivers and cable types can carry the required speed. A small layout change can require more expensive optics across many links. The engineer in the tour moved core racks closer to avoid a costly cabling change, illustrating why physical layout and network design have to be planned together.

**20. Why does the cluster have a fast storage system as well as GPUs?**

**Answer:** GPUs need training or inference data delivered quickly, and long-running jobs need somewhere to save outputs and checkpoints. A slow storage path can idle compute hardware even if the GPU interconnect is fast. A checkpoint is a saved state from which a job can resume after an interruption.

**21. What roles do Proxmox, Kubernetes, and Slurm play in the tour?**

**Answer:** They are different management tools, chosen for different jobs. Proxmox hosts supporting VMs and containers, such as authentication, DNS, and monitoring; Kubernetes coordinates containerized services; and Slurm schedules compute jobs. The tour does not suggest that Proxmox runs the GPU calculations themselves.

**22. How does monitoring support maintenance?**

**Answer:** Monitoring software reports power use and failures, such as a bad supply or optical link, so technicians can locate and replace the part. Redundant parts may let service continue while a fault is investigated. Preconfigured racks and replaceable modules make repairs faster, but detection and human maintenance are still necessary.

**23. Give an example of work the tour says the cluster performs.**

**Answer:** One observed workload concerns protein-folding and biological research related to type 1 diabetes. The example shows why researchers may need substantial parallel computing and data movement; it does not establish that the cluster has produced a treatment.

## 3. Colocation and interconnection — NetworkChuck

**24. What is colocation?**

**Answer:** In colocation, a customer places its own servers or network equipment in another operator’s data center and pays for space, power, cooling, security, and connectivity. The customer may use a rack or a locked cage. This differs from simply renting a cloud VM, where the provider supplies the compute hardware and virtualized service.

**25. Why does the tour show several physical-security checkpoints?**

**Answer:** Each checkpoint narrows access: reception verifies visitors, a two-door entry area deters tailgating, and later badges or biometrics restrict floors and customer cages. Escorts and cameras add observation. A worker or customer should be able to enter only the areas needed for their role.

**26. What is a mantrap, and what attack does it deter?**

**Answer:** It is a controlled two-door entry space that normally requires one door to close before the other opens. It makes it harder for an unauthorized person to follow an authorized person through a secure entrance, an attack called tailgating. It is one part of layered physical security.

**27. How do rack cages help customers sharing one facility?**

**Answer:** Cages provide separate, access-controlled areas within the same data hall. A customer can limit who reaches its equipment even though other customers and facility staff use the building. The tour also shows that security requirements vary: some customers want fully enclosed cages or additional cabinet controls.

**28. Why might a modern data hall use a concrete slab instead of a raised floor?**

**Answer:** A slab can support heavy racks, while cooling air can be supplied from the side and exhausted above. A raised floor is another way to distribute air and route services; neither floor type alone determines whether cooling is good. The layout must match equipment weight and airflow needs.

**29. What makes a carrier-neutral facility valuable?**

**Answer:** It allows multiple telecommunications carriers and other networks to operate in the same location. Customers can choose among them and connect directly to nearby networks or cloud providers. As more networks gather there, the site becomes more useful as an interconnection point.

**30. What is a cross-connect?**

**Answer:** It is a physical cable linking one customer’s equipment to another customer’s, carrier’s, or cloud provider’s equipment within a facility. For example, a company can connect its router to an internet provider’s port. The facility organizes and provisions that local link.

**31. What are a meet-me room and dark fiber?**

**Answer:** A meet-me room is a place where carriers and customers terminate circuits and arrange interconnections. Dark fiber is installed fiber that has not been lit by transmission equipment; an operator can attach suitable optics and use it as part of a private route. A building with many fiber entrances offers more connection options.

**32. How does a software-defined virtual connection differ from a separate cross-connect for each partner?**

**Answer:** The tour’s Fabric example starts with a physical port into the operator’s network. Software then provisions multiple logical connections over that access, such as links to different cloud providers. This can be faster to change than installing a new cable for every connection, though the virtual links still rely on physical network equipment and capacity.

**33. Does direct interconnection eliminate the internet?**

**Answer:** No. It can keep a particular company-to-provider route on a private or provider-managed network and avoid some public-internet hops. Public internet access still exists for other traffic, and the private route can itself span multiple facilities and networks.

## 4. Power, cooling, and fiber — Lawrence Systems

**34. What is a flywheel UPS, and how does it bridge a power outage?**

**Answer:** It stores kinetic energy in a rapidly spinning rotor. When utility power fails, the rotor slows while a generator converts its motion into electricity, carrying the load until longer-lasting backup generation takes over. It is an alternative to a battery-based UPS for short-duration ride-through.

**35. Why can’t backup diesel generators replace a UPS by themselves?**

**Answer:** Generators need time to start, reach operating speed, and produce stable electricity. The tour describes a short startup interval of roughly 16 seconds at that facility. A UPS covers the gap so the IT load does not lose power during the transfer.

**36. Why must generators be synchronized before connecting to a common power bus?**

**Answer:** Their voltage, frequency, and phase must be compatible. Connecting AC sources out of phase can damage equipment or cause protective systems to reject a generator. Synchronization matters especially when several generators work together to support a large facility.

**37. What generator details illustrate redundancy and serviceability?**

**Answer:** The tour points to dual starter motors, redundant filtration, fuel systems, vibration isolation, and parts arranged for maintenance. A fuel day tank keeps a nearby supply ready when a generator starts. Redundancy is most useful when operators test and maintain the parts that may have to take over.

**38. How does the facility move heat from servers to outdoors?**

**Answer:** Room air handlers pull hot air across chilled-water coils and return cooler air. Pumps circulate warmed water to chillers; the chillers transfer heat into another loop that ultimately rejects it outdoors, such as through cooling towers. Servers, air, water loops, and outdoor heat rejection are connected stages of one process.

**39. Why does the tour call a large chilled-water tank a “cold battery”?**

**Answer:** The facility can chill water when electricity is cheaper or cooling is more efficient, then use that stored cooling later during peak demand. It stores thermal capacity, not electrical charge. The tank can reduce when chillers have to work hardest, though pumps and controls still need power.

**40. What is the purpose of diverse fiber paths?**

**Answer:** Separate entrances or routes reduce the chance that one cut disables every network connection. Merely buying links from two carriers is insufficient if both share the same conduit or manhole. Route diversity has to be checked physically.

**41. What are IP KVM and IPMI used for?**

**Answer:** They provide remote access to a server’s console or management functions, including work before the operating system starts. IP KVM carries keyboard, video, and mouse access over a network; IPMI is a server-management interface often built into hardware. They help technicians troubleshoot without standing at the rack, but access must be secured.

**42. How can redundant network switches simplify upgrades?**

**Answer:** If customer traffic has two working paths, one switch can be updated or replaced while the other carries service. The tour describes live upgrades using this arrangement. A successful change still depends on correct configuration, sufficient spare capacity, and testing.

**43. What is a static transfer switch (STS)?**

**Answer:** It selects between two electrical inputs for a load. A fast solid-state STS can transfer power when one input fails before downstream equipment notices a sustained interruption. It is part of the power-distribution design, not a source of energy by itself.

**44. What is a power distribution unit (PDU), and how is it different from a server power supply?**

**Answer:** A PDU distributes facility power to the outlets serving a rack or room and may monitor consumption. A server power supply converts the incoming AC power into the DC voltages its components need. The tour’s interchangeable PDU-cable example shows how matching voltage, current, phase, and connector type matters.

**45. Why do facilities stock spare drives, cables, optics, and power equipment?**

**Answer:** A failed part or missing connector can halt a repair or delay a customer installation. Keeping compatible spares nearby lets on-site staff replace parts and provide “remote hands” service without waiting for a customer to travel in. The exact form factor and electrical rating must match the equipment.

**46. Why offer quarter- or half-cabinet colocation?**

**Answer:** Some customers need only a few servers or an off-site backup, not an entire rack. Smaller locked spaces let them buy an appropriate amount of space and power while maintaining separation from other tenants.

## 5. AI and the electric grid — CNBC

**47. Why does AI growth create a data-center power problem?**

**Answer:** Training and serving large models require many processors that draw electricity and produce heat. Cooling and other facility systems add to that load. When multiple large sites seek connections in one region, the grid may lack generation, transmission, transformers, or local capacity to serve them promptly.

**48. What is the difference between generating electricity and delivering it to a data center?**

**Answer:** A power plant may have available output while transmission lines, substations, or transformers cannot carry enough of it to the chosen site. The report describes both supply and grid-delivery bottlenecks. A new facility therefore needs electrical infrastructure as well as a source of energy.

**49. What does “load shedding” mean in the report?**

**Answer:** It means reducing demand on the public grid during a constrained period. The operator featured in the report says it can disconnect from the grid and run its own generators when the utility requests relief. This may support grid reliability, but fuel use and emissions still matter.

**50. How can monitoring a transformer help grid operators?**

**Answer:** Sensors and predictive software can indicate stress or a developing fault, helping operators prioritize replacement and shift load where capacity exists. Monitoring cannot create new transformer capacity; it helps use and maintain existing equipment more safely.

**51. Why is cooling also a water issue?**

**Answer:** Some cooling designs evaporate water to reject heat, which can consume substantial local water even when it saves electricity. Other designs use more air cooling or closed liquid loops with different tradeoffs. Water withdrawal, water consumption, electricity use, and local scarcity should be considered separately.

**52. What is direct-to-chip cooling?**

**Answer:** Coolant passes through a plate close to a processor, removing heat near its source. It can handle dense equipment more effectively than relying only on room air. It still needs pumps and a way to reject the collected heat, and older facilities may require substantial retrofits.

**53. Give examples of ways to get more computing work per watt.**

**Answer:** The report discusses specialized processors, hardware-assisted data compression, more efficient memory access, and performing suitable AI tasks on a user device instead of a remote server. Each helps only for workloads it can handle; an energy-saving claim for one chip or application is not a universal comparison.

**54. Why should precise per-query energy and water figures be treated cautiously?**

**Answer:** They depend on the model, hardware, response length, utilization, data-center efficiency, location, and cooling method. The report uses illustrative estimates, but there is no single fixed footprint for every AI prompt. The reliable conclusion is that aggregate demand can be large when usage and facilities scale up.

## 6. Two AI-server specifications

**55. What do the two server specifications have in common?**

**Answer:** Each describes a rack-mounted AI/HPC server with eight GPUs, two CPUs, substantial DIMM capacity, high-speed networking options, hot-swappable NVMe storage bays, and redundant power supplies. The designs show that a “GPU server” is a complete computing and infrastructure system, not just eight accelerator cards.

**56. Why pair eight GPUs with two CPUs?**

**Answer:** The GPUs handle suitable parallel calculations. The CPUs run the operating system and coordinate tasks such as input/output, job control, data preparation, and communication with the accelerators. The best division of work depends on the application.

**57. What are DIMMs and NVMe hot-swap bays?**

**Answer:** DIMMs are modules of system RAM used for active CPU-side data. NVMe bays hold fast persistent SSDs; “hot-swap” means a supported drive can be removed or replaced while the server remains powered, subject to the storage system’s procedures and redundancy. RAM and NVMe storage serve different purposes.

**58. Why do the specifications list both high-speed accelerator networking and ordinary LAN ports?**

**Answer:** Accelerator or cluster links move large amounts of data among GPUs and servers. The 10 Gb/s LAN ports can support other Ethernet connectivity, such as management or customer traffic. Ports with different roles should not be assumed interchangeable simply because both connect to a network.

**59. What do redundant power supplies accomplish?**

**Answer:** They let the server keep running if one supply or feed fails, provided the remaining supplies can carry the load. The listed “6+6” and “3+1” arrangements are configuration examples, not promises of uninterrupted service. The upstream electrical paths must also work.

## 7. Powering AI — Evan Gorelick

**60. Why is continuous power important to a data center?**

**Answer:** Servers, networking, and cooling operate around the clock. Even a brief disruption can stop services or interrupt a long-running computation. UPS systems, generators, redundant feeds, and careful power-source planning help maintain continuity.

**61. Why can’t solar or wind power alone always meet continuous demand?**

**Answer:** Their output varies with sunlight and weather while data-center load can remain high at night and during calm periods. Batteries can shift energy over shorter intervals, but extended low-generation periods need more storage, another power source, or grid supply. The answer depends on local generation and storage design.

**62. What is the appeal and limitation of nuclear power for AI facilities?**

**Answer:** Nuclear plants can supply steady, low-carbon electricity from a relatively small land footprint. New plants are expensive and have long planning and construction lead times, so they cannot necessarily satisfy near-term demand. Gorelick presents nuclear investment as a bet on future demand.

**63. Why is natural gas attractive to developers, and what is its cost to the climate?**

**Answer:** Gas generation can often be developed faster than a new nuclear plant and can provide dispatchable power when wind or solar output varies. Burning gas emits greenhouse gases, and gas infrastructure can lock in emissions for years. Gorelick frames this speed-versus-emissions tension as central to the current build-out.

**64. What should an organization weigh when choosing a site and power strategy?**

**Answer:** It should compare reliable electrical capacity, grid-connection time, backup needs, cooling and water availability, emissions, cost, and effects on nearby communities. A power source that is technically available may still require transmission or cooling infrastructure. Gorelick’s forecasts and investment figures describe expectations, not guaranteed outcomes.
