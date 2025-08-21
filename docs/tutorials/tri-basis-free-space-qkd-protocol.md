---
sidebar_position: 2
title: Tri-Basis Free-Space QKD Protocol
description: This protocol implements a Free-Space Quantum Key Distribution (QKD) system with three mutually unbiased bases for enhanced security
---

## Overview 

This protocol implements a Free-Space Quantum Key Distribution (QKD) system with three mutually unbiased bases for enhanced security over a 1 km free-space optical channel. Unlike BB84 (which uses two bases), TFS-QKD introduces an additional basis to increase eavesdropper detection probability and strengthen key generation security.

The experiment was executed and simulated in Necrozma Labs ORL, using view generated virtual components and custom research execution scripts.

## The Physics Behind TFS-QKD

#### What is QKD?
Quantum Key Distribution uses quantum states of photons (typically polarization) to distribute cryptographic keys between two parties (Alice and Bob) with unconditional security based on quantum mechanics principles.

**Security Principle**: Any attempt at eavesdropping (Eve) introduces measurable disturbances in quantum states due to the No-Cloning Theorem and Heisenberg Uncertainty Principle.

#### BB84 vs TFS-QKD:
BB84 uses 2 bases (rectilinear & diagonal).
TFS-QKD uses 3 bases (rectilinear, diagonal, and circular) → making it harder for Eve to guess the correct basis, thus increasing error rates for eavesdroppers.


#### **Mathematical Foundation**

* **Bases**:

  * Basis 1: `|H⟩, |V⟩` (Horizontal & Vertical polarization)
  * Basis 2: `|+⟩, |-⟩` (Diagonal polarization)
  * Basis 3: `|R⟩, |L⟩` (Right & Left Circular polarization)

* **Mutual Unbiasedness**:
  For any two bases $B_i, B_j$:

  $$
  |\langle \psi_i | \phi_j \rangle|^2 = \frac{1}{2}
  $$

* **Security Metric**: Quantum Bit Error Rate (QBER) threshold for abort ≈ **11%** (for BB84) and adjusted for TFS-QKD ≈ **15%**.

# Virtual Components & Research Execution Details

This document contains **virtual component definitions** and a clear **research execution description** intended for the *Quantum Communication Lab* inside **Open Research Laboratory (ORL)** by Necrozma Labs. Paste these component definitions into your workflow builder, then add the execution description in the research-details panel for reproducible runs.


## Create TFS-QKD in ORL

:::warning ORL
Make sure you are signed in and have sufficient `credits` for making this experiment.
:::

#### Steps to Create:
1. In ORL, create a new workflow under **Quantum Communication Lab**.
2. Add the components listed [below](#components). 
3. In the workflow's **Research Details**, paste the [Research Execution Description](#research-execution-description) (after the components section) .
4. Run the simulation 

:::tip Pro Tip  
You can easily replicate this experiment by using our **pre-built workflow**.  
Simply navigate to the **Workflow** page in the **Open Research Laboratory**, select the **TFS QKD Workflow**, and click **Run** to execute it.  
:::

Inspect outputs: counts, sifted key, QBER, plots (QBER, detection rates), and session decision (`success` or `aborted`).

### Components 
:::note Note
Make these components in ORL
:::

#### 1. PhotonSource (component)

* **description:** Pulsed attenuated laser source emitting polarization‑encoded weak coherent pulses.
* **parameters:**

  * `wavelength_nm`: 810
  * `pulse_width_ns`: 2.0
  * `repetition_rate_MHz`: 5
  * `mean_photon_number_mu`: 0.4
  * `decoy_enabled`: true
  * `decoy_mu_signal`: 0.4
  * `decoy_mu_weak`: 0.1
  * `decoy_vacuum`: true
  * `timing_jitter_ps`: 100
  * `random_seed`: 0

#### 2. PolarizationModulator (component)

* **description:** Maps logical bits and basis choices into physical polarization states.
* **parameters:**

  * `bases`: `["Z","X","Y"]`
  * `states_per_basis`: `2`
  * `state_mapping`: `Z: {0->0deg,1->90deg}, X: {0->45deg,1->135deg}, Y: {0->RHC,1->LHC}`
  * `modulation_latency_ns`: 10
  * `extinction_ratio_dB`: 30

#### 3. Attenuator (component)

* **description:** Sets mean photon number at channel input.
* **parameters:**

  * `insertion_loss_dB`: 0.5
  * `target_mu`: 0.4

#### 4. BeamExpander (component)

* **description:** Adjusts beam divergence for 1 km link.
* **parameters:**

  * `magnification`: 12
  * `divergence_mrad`: 0.42

#### 5. PointingAndTracking (component)

* **description:** Models coarse pointing error and fine jitter.
* **parameters:**

  * `coarse_error_mrad`: 0.1
  * `fine_jitter_mrad_rms`: 0.02
  * `update_rate_Hz`: 10

#### 6. FreeSpaceChannel (component)

* **description:** Models geometric loss, atmospheric attenuation, and polarization drift.
* **parameters:**

  * `distance_km`: 1.0
  * `atm_loss_dB`: 2.0      # atmospheric attenuation (clear night)
  * `geometric_loss_dB`: 6.0
  * `pointing_loss_dB`: derived from pointing\_error and aperture
  * `polarization_drift_rate_per_km`: 0.001
  * `background_radiance_cps`: 200  # background counts per detector

#### 7. PolarizationDrift (component)

* **description:** Random walk of polarization state over time.
* **parameters:**

  * `drift_rate_per_sec`: 1e-4
  * `correlation_time_s`: 10

#### 8. BasisSelector\_Bob (component)

* **description:** Randomly chooses a measurement basis for Bob per incoming pulse.
* **parameters:**

  * `bases`: `["Z","X","Y"]`
  * `probabilities`: `[0.3333,0.3333,0.3333]`

#### 9. PolarizationAnalyzer (component)

* **description:** Performs projective measurement for the chosen basis.
* **parameters:**

  * `efficiency_percent`: 70
  * `dark_count_cps`: 100
  * `dead_time_ns`: 50
  * `time_window_ns`: 2
  * `detection_jitter_ps`: 500

#### 10. TimeTagger (component)


* **description:** Records detection timestamps and detector channels.
* **parameters:**

  * `resolution_ps`: 100
  * `buffer_size_events`: 1\_000\_000

#### 11. ClassicalChannel (component)


* **description:** Authenticated classical channel for sifting & postprocessing.
* **parameters:**

  * `latency_ms`: 50
  * `bandwidth_kbps`: 1000
  * `auth_method`: `HMAC-SHA256`

#### 12. PostProcessingUnit (component)


* **description:** Performs sifting, QBER estimation, error correction, and privacy amplification.
* **parameters:**

  * `qber_sample_fraction`: 0.05
  * `qber_threshold`: 0.11
  * `error_correction_method`: `LDPC`
  * `ec_efficiency`: 1.2
  * `privacy_amplification`: `toeplitz_hash`
  * `reporting_interval_s`: 60


:::note Final Notes 
These virtual components are intentionally parameterized to reflect real hardware tradeoffs while remaining computationally tractable for ORL simulation runs.

:::


### Research Execution Description

:::info Objective

Simulate and validate a **three‑basis polarization QKD protocol** over a **1 km free‑space link** using virtualized components. Evaluate sifted key rates, per‑basis QBER, and session decision logic (abort if QBER > 11%).
:::

#### paste into ORL research details ( Description )

``` 
Alice's PhotonSource emits weak coherent pulses at repetition_rate_MHz and mu per pulse.
Encoding:
For each pulse, Alice samples a random bit and a random basis from {Z,X,Y}.
PolarizationModulator maps (basis, bit) → physical polarization state and applies modulation latency.
Transmission:
BeamExpander and PointingAndTracking determine instantaneous beam footprint and pointing losses.
FreeSpaceChannel calculates total channel loss (geometric + atmospheric + pointing) and applies polarization drift.
Background counts and stray photons are added to the detection probabilities based on background_radiance_cps.
Detection:
Bob's BasisSelector selects a basis per time slot. Incoming pulses are routed to PolarizationAnalyzer.
PolarizationAnalyzer applies detection model: quantum efficiency, dark counts, dead time, and timing jitter.
TimeTagger records successful detection events with timestamps and detector channels.
Classical Sifting:
Over the ClassicalChannel, Alice and Bob exchange basis choices for each time tag (authenticated). Matching bases form the sifted key.
QBER Estimation:
From the sifted key, randomly sample fraction qber_sample_fraction and publicly compare to estimate QBER (per‑basis and aggregate).
If QBER > qber_threshold (0.11), set session_status = "ABORTED", set reported QBER to 1.00 (100%), and terminate.
Post‑Processing (if QBER ≤ threshold):
Execute LDPC error correction with ec_efficiency and reconcile keys.
Run privacy amplification with Toeplitz hashing to derive final secret key.
Report secure key length, leakages, and final QBER.
Outputs:
Time‑series: detection counts per detector (1 s bins)
Sifted key size and fraction
Per‑basis and aggregate QBER
Session status (SUCCESS / ABORTED)
Plots: QBER bar chart with threshold line, detection rate time series.
```

## Our result

We successfully conducted the QKD experiment. The protocol executed as expected, and below are the results we obtained.

```json
Sifted key size: 3140
Sifted key fraction: 0.0314
Aggregate QBER estimate: 0.0462
Per-basis QBER:
    Z => 0.0416
    Y => 0.0465
    X => 0.0500
Session Status: SUCCESS
```

## Run Workflow
:::tip Want to Try It Yourself?

If you want to replicate this experiment or customize it, we have made the workflow publicly available in our Open Research Laboratory.
You can:
- Run a Copy: Simply click on Run a Copy of our QKD workflow.
- Modify & Execute: Make any desired modifications and execute the experiment on your own.

This allows you to leverage our pre-configured setup without starting from scratch.

::::info Steps to Run
1. Visit Open Research Laboratory.
2. Navigate to the Workflows page.
3. Select the TFS QKD Workflow.
4. Click on Run – this will create a duplicate of the workflow for your use.
5. Run the experiment directly on your virtual lab environment.

::::

