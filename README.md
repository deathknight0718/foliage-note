# 基于 Pytorch 的机器学习内容速查表

1. [PyTorch 计算框架速查](#1-pytorch-计算框架速查)
    - 1.1. [张量运算的分类](#11-张量运算的分类)
    - 1.2. [矩阵的基本操作](#12-矩阵的基本操作)
    - 1.3. [矩阵的高级操作](#13-矩阵的高级操作)
    - 1.4. [广播计算的规则](#14-广播计算的规则)
2. [神经网络内容框架](#2-神经网络内容框架)
    - 2.1. [特征缩放汇总](#21-特征缩放汇总)
    - 2.2. [激活函数汇总](#22-激活函数汇总)
    - 2.3. [损失函数汇总](#23-损失函数汇总)
    - 2.4. [优化函数汇总](#24-优化函数汇总)


## 1. PyTorch 计算框架速查

### 1.1. 张量运算的分类

| 运算类别         | 具体操作                                                            | 说明                                                            |
| ---------------- | ------------------------------------------------------------------- | --------------------------------------------------------------- |
| **基本数学运算** | 元素级运算 (+, -, \*, /, exp, log, abs)                             | 对张量中的每个元素进行操作。                                    |
|                  | 矩阵运算 (matmul, mm, @, dot)                                       | 执行矩阵乘法和向量点积。                                        |
| **归约运算**     | 统计运算 (sum, mean, max, min, argmax, argmin)                      | 计算张量的统计信息，如总和、均值、最大值、最小值以及它们的索引。|
|                  | 逻辑运算 (all, any)                                                 | 对张量中的元素进行逻辑运算。                                    |
| **比较运算**     | eq, ne, gt, ge, lt, le                                              | 比较张量中的元素，并返回布尔张量。                              |
| **张量操作**     | 形状变换 (reshape, view, t, transpose, unsqueeze, squeeze, permute) | 改变张量的形状和维度。                                          |
|                  | 切片和索引 (基本索引和切片，gather, scatter)                        | 访问和修改张量中的元素。                                        |
|                  | 连接和分割 (cat, stack, chunk, split)                               | 连接多个张量或将一个张量分割成多个部分。                        |
| **线性代数运算** | 矩阵分解 (svd, qr, cholesky)                                        | 执行矩阵的分解操作。                                            |
|                  | 求解线性方程组 (solve)                                              | 求解线性方程组。                                                |
|                  | 计算逆矩阵 (inv)                                                    | 计算矩阵的逆。                                                  |
|                  | 计算特征值和特征向量 (eig, eigh)                                    | 计算矩阵的特征值和特征向量。                                    |
| **其他高级操作** | 卷积和池化 (Conv2d, MaxPool2d)                                      | 在图像和信号处理中执行卷积和池化操作。 (位于 `torch.nn` 模块中) |
|                  | 激活函数 (sigmoid, relu, tanh)                                      | 在神经网络中应用激活函数。 (位于 `torch.nn.functional` 模块中)  |
|                  | 广播 (broadcasting)                                                 | 使形状不兼容的张量可以进行计算。                                |


### 1.2. 矩阵的基本操作

| 操作类型 | 具体操作 | 说明 | 示例 |
| - | - | - | - |
| **创建张量** | `torch.Tensor()` | 创建多维数组 | `torch.Tensor([1, 2, 3])` |
| | `torch.zeros()` | 创建全零张量 | `torch.zeros((2, 3))` |
| | `torch.ones()` | 创建全一张量 | `torch.ones((2, 3))` |
| | `torch.randn()` | 创建服从标准正态分布的随机数张量 | `torch.randn((2, 3))` |
| **基本运算** | `torch.add()` / `+` | 加法 | `torch.add(a, b)` / `a + b` |
| | `torch.sub()` / `-` | 减法 | `torch.sub(a, b)` / `a - b` |
| | `torch.mul()` / `*` | 元素级乘法 | `torch.mul(a, b)` / `a * b` |
| | `torch.div()` / `/` | 除法 | `torch.div(a, b)` / `a / b` |
| | `torch.matmul()` / `torch.mm()` / `@` | 矩阵乘法 | `torch.matmul(a, b)` / `a @ b` |
| **矩阵操作** | `torch.t()` / `torch.transpose()` | 转置 | `torch.t(a)` / `torch.transpose(a, 0, 1)` |
| | `torch.reshape()` / `torch.view()` | 重塑 | `torch.reshape(a, (2, 3))` / `a.view(2, 3)` |
| | 索引和切片 | 访问和修改张量元素 | `a[0, 1]` / `a[:, 1:]` |
| | `torch.cat()` / `torch.stack()` | 连接 | `torch.cat((a, b), dim=0)` / `torch.stack((a, b), dim=0)` |
| **统计操作** | `torch.mean()` | 均值 | `torch.mean(a)` |
| | `torch.sum()` | 总和 | `torch.sum(a)` |
| | `torch.max()` | 最大值 | `torch.max(a)` |
| | `torch.min()` | 最小值 | `torch.min(a)` |
| **线性代数** | `torch.inverse()` | 逆矩阵 | `torch.inverse(a)` |
| | `torch.det()` | 行列式 | `torch.det(a)` |
| | `torch.eig()` | 特征值和特征向量 | `torch.eig(a)` |

### 1.3. 矩阵的高级操作

| 操作类别 | 具体操作 | 说明 |
| - | - | - |
| **线性代数操作** | `torch.linalg.cholesky()` | Cholesky 分解 |
| | `torch.linalg.qr()` | QR 分解 |
| | `torch.linalg.svd()` | 奇异值分解（SVD） |
| | `torch.linalg.eig()` | 计算复数域上的特征值和特征向量 |
| | `torch.linalg.eigh()` | 计算实对称或复 Hermitian 矩阵的特征值和特征向量 |
| | `torch.linalg.inv()` | 计算矩阵的逆 |
| | `torch.linalg.det()` | 计算矩阵的行列式 |
| | `torch.linalg.solve()` | 求解线性方程组 |
| **张量操作** | 高级索引 (gather, scatter) | 使用整数或布尔张量索引，进行数据收集或分散 |
| | `torch.squeeze()` | 删除大小为 1 的维度 |
| | `torch.unsqueeze()` | 添加大小为 1 的维度 |
| | `torch.permute()` | 重新排列张量的维度 |
| | `torch.reshape()`,`torch.view()` | 重塑张量形状 |
| **数学操作** | 高级数学函数 (logsumexp, sigmoid, tanh 等) | 应用各种高级数学函数 |
| | 归约操作 (argmax, argmin, sum, mean, max 等) | 多维数据的统计运算，如求最大/小值索引、求和、均值等 |
| **卷积和池化** | `torch.nn.Conv2d()` | 二维卷积 |
| | `torch.nn.MaxPool2d()` | 二维最大池化 |

### 1.4. 广播计算的规则

在 PyTorch 中，广播（Broadcasting）是一种强大的机制，它允许对形状不完全相同的张量进行算术运算。为了更清晰的理解，以下是广播计算的详细规则：

**广播的核心思想：**

* 使形状不相同的张量能够进行计算，通过在计算时对张量的某些维度进行扩展来实现。
* 在实际运行中，并没有真的复制数据，而是在计算过程中“虚拟”的对数据进行了复制。

**广播的规则：**

当两个张量的形状不兼容时，PyTorch 会尝试应用广播规则。如果可以应用，广播将使这些张量兼容。

广播遵循以下规则：

| # | 规则描述 | 详细说明 |
| - | - | - |
| 1 | **维度对齐** | 如果两个张量的维度数不同，则在维度数较小的张量的前面（左侧）填充维度 1，直到两个张量的维度数相同。 |
| 2 | **维度匹配** | 对于每个维度，两个张量的大小必须满足以下条件之一：<br/> a. 大小相等。 <br/> b. 其中一个张量的大小为 1。<br/> c. 其中一个张量不存在这个维度。（在PyTorch中，实际效果与大小为1类似，可以理解为此条属于情况b的补充说明） |


**广播的运算过程**

* 当满足了如上的广播规则后，维度为1的那个维度将会被扩展到和另外一个tensor的对应维度相同的size。
* 张量会表现的好像维度为1的那个维度，数据被复制了相同于另外一个tensor的对应的维度的size的次数。

**简单总结:**

* 从尾部维度开始比较，维度大小相等或其中一个维度为 1 时可以广播。
* 若张量维度数量不同，则在数量较小的张量左侧补1直到维度数量相同。
* 在可以进行广播的情况下，维度为1的维度进行“虚拟”复制以达到可以运算的状态。

**应用场景：**

* 张量与标量之间的运算。
* 不同形状张量之间的元素级运算。
* 卷积运算时的参数广播。

## 2. 神经网络内容框架

### 2.1. 特征缩放汇总

| 方法名称 | 原理 | 适用场景 |
| - | - | - |
| 标准化 (Standardization) | 将特征缩放到均值为 0，标准差为 1 的范围内 | * 数据服从正态分布或近似正态分布的机器学习算法，对异常值不敏感<br/>* 可以消除特征之间的尺度差异，提高模型收敛速度，不适合稀疏数据 |
| 最小-最大缩放 (Min-Max Scaling) | 将特征缩放到一个给定的范围内（通常是 0 到 1） | * 特征范围有限的数据<br/>* 简单易于理解，可以保持原始数据的相对关系<br/>* 容易受到异常值的影响 |
| 归一化 (Normalization) | 缩放到单位范数（L1或L2范数） | * 文本分类、聚类等任务，关注向量的方向而不是大小的时候<br/>* 可以保持特征向量的方向不变<br/>* 改变了原始数据的分布 |
| Robust缩放 (Robust Scaling) | 使用中位数和四分位距来缩放数据，对异常值不敏感 | * 数据中存在许多异常值的情况<br/>* 对于异常值不敏感 |

### 2.2. 激活函数汇总

在此将常用的激活函数列成表格：

| 名称 | 中译 | PyTorch 类 | 定义 | 优势 |
|---|---|---|---|---|
| **ReLU (Rectified Linear Unit)** | 修正线性单元 | `torch.nn.ReLU` | $ f(x)=max(0, x) $ | * 计算效率高<br> * 缓解梯度消失问题（在正区间）<br> * 在很多情况下表现良好 |
| **Sigmoid** | Sigmoid 函数 (S 型函数) | `torch.nn.Sigmoid` | $ f(x)=\frac{1}{1+e^{-x}} $ | * 输出范围在 0 到 1 之间，可以解释为概率<br> * 在二分类问题中常用 |
| **Tanh (Hyperbolic Tangent)** | 双曲正切函数 | `torch.nn.Tanh` | $ f(x)=\frac{e^x-e^{-x}}{e^x+e^{-x}} $ | * 输出范围在 -1 到 1 之间，均值为 0<br> * 有时比 Sigmoid 收敛更快 |
| **LeakyReLU** | 带泄露修正线性单元 | `torch.nn.LeakyReLU` | $ f(x) = \begin{cases} x, & \text{for } x > 0 \\ \alpha x, & \text{for } x \leq 0 \end{cases} $ | * 解决了 ReLU 的“死亡 ReLU”问题<br> * 在负区间有小的非零梯度 |
| **Softmax** | Softmax 函数 | `torch.nn.Softmax` | $ f(x_i)=\frac{e^{x_i}}{\sum_{j=1}^{K}e^{x_j}} $ | * 将输出转换为概率分布<br> * 通常用于多分类问题的输出层 |
| **Softplus** | Softplus 函数 | `torch.nn.Softplus` | $ f(x)=\ln(1 + e^x) $ | * ReLU 的平滑版本<br> * 处处可导 |
| **ELU (Exponential Linear Unit)** | 指数线性单元 | `torch.nn.ELU` | $ f(x) = \begin{cases} x & \text{if } x > 0 \\ \alpha (e^x - 1) & \text{otherwise} \end{cases} $ | * 解决了 ReLU 的“死亡 ReLU”问题<br> * 输出的均值接近于零，加速收敛 |
| **PReLU (Parametric ReLU)** | 参数化修正线性单元 | `torch.nn.PReLU` | $ f(x) = \begin{cases} x, & \text{for } x > 0 \\ \alpha x, & \text{for } x \leq 0 \end{cases} $ | * LeakyReLU 的改进版本，负区间的斜率是可学习的参数<br> * 适应性更强 |
| **GELU (Gaussian Error Linear Unit)** | 高斯误差线性单元 | `torch.nn.GELU` | $ f(x) = x \cdot \frac{1}{2} \left[ 1 + \text{erf} \left( \frac{x}{\sqrt{2}} \right) \right] $ |   *   在 Transformer 模型中常用<br>    *   性能通常优于 ReLU 和 ELU |

### 2.3. 损失函数汇总

| 损失函数 | 主要应用场景 | 关键特点 |
| :- | :- | :- |
| `torch.nn.CrossEntropyLoss` | 多类分类 | 结合 `LogSoftmax` 和 `NLLLoss`，适用于多分类问题，数值稳定性好 |
| `torch.nn.BCELoss` | 二分类 | 二进制交叉熵损失，适用于输出为概率的二分类问题 |
| `torch.nn.BCEWithLogitsLoss` | 二分类 | 结合 `Sigmoid`，适用于输出为 logits 的二分类问题，数值稳定性更好 |
| `torch.nn.NLLLoss` | 多类分类 | 负对数似然损失，通常与 `LogSoftmax` 结合使用 |
| `torch.nn.MSELoss` | 回归 | 均方误差损失，计算预测值和目标值之间的平方差的平均值 |
| `torch.nn.L1Loss` | 回归 | 平均绝对误差损失，计算预测值和目标值之间的绝对差的平均值，对离群值更鲁棒 |
| `torch.nn.SmoothL1Loss` | 回归 | 平滑 L1 损失，结合 L1 和 L2 损失的优点，在误差较小时使用 L2，误差较大时使用 L1 |
| `torch.nn.HuberLoss` | 回归 | Huber损失函数，是SmoothL1Loss的超集。 |
| `torch.nn.CTCLoss` | 序列标注（如语音识别） | Connectionist Temporal Classification Loss，用于序列标注问题 |
| `torch.nn.KLDivLoss` | 计算KL散度 | 计算kl散度。 |

### 2.4. 优化函数汇总

好的，以下是 PyTorch 中常用优化器的汇总表格：

| 优化器 | 主要特点 | 适用场景 |
| :- | :- | :- |
| `torch.optim.SGD` | 随机梯度下降，基础优化器，可加入动量 | 适用于大多数任务，特别是在配合合适的学习率调度策略时 |
| `torch.optim.Adam` | 自适应矩估计，结合 AdaGrad 和 RMSProp 的优点，自适应调整学习率 | 大多数任务的良好起点，尤其适用于处理大规模数据和复杂模型 |
| `torch.optim.AdamW` | Adam 的改进，解耦权重衰减，提高泛化能力 | 推荐使用，通常优于 Adam，特别是在需要强泛化能力的场景 |
| `torch.optim.RMSprop` | 均方根传播，通过计算梯度平方的指数移动平均数调整学习率 | 适用于处理非平稳目标，例如循环神经网络 |
| `torch.optim.Adagrad` | 自适应梯度算法，自适应调整每个参数的学习率，对于稀疏数据表现良好 | 适用于数据稀疏的场景，但可能导致学习率过快下降 |
| `torch.optim.Adadelta`| Adagrad 的改进，解决了 Adagrad 学习率过快下降的问题 | 适用于需要自适应学习率且对初始学习率不敏感的场景 |
| `torch.optim.ASGD` | 平均随机梯度下降 | 对于平滑梯度优化的效果较好。 |
| `torch.optim.Rprop` | 弹性反向传播, 一个直接自适应权值更新大小的优化算法，并且根据梯度的符号进行对应的更新。 | 通常适用离线（batch）训练模式， 不太适用于在线（mini-batch）训练模式。 |